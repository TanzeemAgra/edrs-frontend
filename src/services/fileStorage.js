/**
 * File Storage Service
 * Handles file upload, storage, and management across different platforms
 * Supports AWS S3, Google Cloud Storage, Azure Blob, and local storage
 */

import { storage } from '../config/storage'

class FileStorageService {
  constructor() {
    this.provider = storage.provider
    this.config = storage.config[this.provider]
  }

  /**
   * Upload file to configured storage provider
   * @param {File} file - File to upload
   * @param {Object} options - Upload options
   * @returns {Promise<Object>} Upload result with file URL and metadata
   */
  async uploadFile(file, options = {}) {
    const {
      folder = 'documents',
      generateUniqueName = true,
      metadata = {}
    } = options

    try {
      // Generate unique filename if requested
      const fileName = generateUniqueName 
        ? this.generateUniqueFileName(file.name)
        : file.name

      const filePath = `${folder}/${fileName}`

      // Get upload URL and metadata based on provider
      const uploadResult = await this.getUploadMethod(filePath, file, metadata)
      
      return {
        success: true,
        fileUrl: uploadResult.url,
        fileName: fileName,
        originalName: file.name,
        size: file.size,
        type: file.type,
        path: filePath,
        provider: this.provider,
        uploadId: uploadResult.uploadId,
        metadata: {
          ...metadata,
          uploadedAt: new Date().toISOString(),
          checksum: await this.calculateChecksum(file)
        }
      }
    } catch (error) {
      console.error('File upload failed:', error)
      throw new Error(`Upload failed: ${error.message}`)
    }
  }

  /**
   * Get appropriate upload method based on provider
   */
  async getUploadMethod(filePath, file, metadata) {
    switch (this.provider) {
      case 'aws-s3':
        return await this.uploadToS3(filePath, file, metadata)
      case 'google-cloud':
        return await this.uploadToGCS(filePath, file, metadata)
      case 'azure-blob':
        return await this.uploadToAzure(filePath, file, metadata)
      case 'local':
        return await this.uploadToLocal(filePath, file, metadata)
      default:
        throw new Error(`Unsupported storage provider: ${this.provider}`)
    }
  }

  /**
   * AWS S3 Upload
   */
  async uploadToS3(filePath, file, metadata) {
    // For production: Use AWS SDK or presigned URLs
    // For demo: Simulate S3 upload
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', filePath)
    formData.append('metadata', JSON.stringify(metadata))

    const response = await fetch('/api/storage/s3/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('S3 upload failed')
    }

    const result = await response.json()
    return {
      url: `https://${this.config.bucket}.s3.${this.config.region}.amazonaws.com/${filePath}`,
      uploadId: result.uploadId
    }
  }

  /**
   * Google Cloud Storage Upload
   */
  async uploadToGCS(filePath, file, metadata) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', filePath)
    formData.append('metadata', JSON.stringify(metadata))

    const response = await fetch('/api/storage/gcs/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('GCS upload failed')
    }

    const result = await response.json()
    return {
      url: `https://storage.googleapis.com/${this.config.bucket}/${filePath}`,
      uploadId: result.uploadId
    }
  }

  /**
   * Azure Blob Storage Upload
   */
  async uploadToAzure(filePath, file, metadata) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', filePath)
    formData.append('metadata', JSON.stringify(metadata))

    const response = await fetch('/api/storage/azure/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Azure Blob upload failed')
    }

    const result = await response.json()
    return {
      url: `https://${this.config.accountName}.blob.core.windows.net/${this.config.containerName}/${filePath}`,
      uploadId: result.uploadId
    }
  }

  /**
   * Local Storage Upload (Development/Testing)
   */
  async uploadToLocal(filePath, file, metadata) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', filePath)
    formData.append('metadata', JSON.stringify(metadata))

    const response = await fetch('/api/storage/local/upload', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error('Local upload failed')
    }

    const result = await response.json()
    return {
      url: `${window.location.origin}/media/${filePath}`,
      uploadId: result.uploadId
    }
  }

  /**
   * Generate unique filename with timestamp
   */
  generateUniqueFileName(originalName) {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    const extension = originalName.split('.').pop()
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "")
    
    return `${nameWithoutExt}_${timestamp}_${random}.${extension}`
  }

  /**
   * Calculate file checksum for integrity verification
   */
  async calculateChecksum(file) {
    try {
      const buffer = await file.arrayBuffer()
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    } catch (error) {
      console.warn('Could not calculate checksum:', error)
      return null
    }
  }

  /**
   * Delete file from storage
   */
  async deleteFile(filePath) {
    try {
      const response = await fetch(`/api/storage/${this.provider}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ path: filePath })
      })

      if (!response.ok) {
        throw new Error('Delete failed')
      }

      return { success: true }
    } catch (error) {
      console.error('File deletion failed:', error)
      throw new Error(`Delete failed: ${error.message}`)
    }
  }

  /**
   * Get file information
   */
  async getFileInfo(filePath) {
    try {
      const response = await fetch(`/api/storage/${this.provider}/info?path=${encodeURIComponent(filePath)}`)
      
      if (!response.ok) {
        throw new Error('Failed to get file info')
      }

      return await response.json()
    } catch (error) {
      console.error('Get file info failed:', error)
      throw new Error(`Get file info failed: ${error.message}`)
    }
  }

  /**
   * Generate presigned URL for direct upload (for large files)
   */
  async getPresignedUploadUrl(fileName, fileType, options = {}) {
    try {
      const response = await fetch('/api/storage/presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName,
          fileType,
          provider: this.provider,
          ...options
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get presigned URL')
      }

      return await response.json()
    } catch (error) {
      console.error('Presigned URL generation failed:', error)
      throw new Error(`Presigned URL generation failed: ${error.message}`)
    }
  }

  /**
   * Batch upload multiple files
   */
  async uploadMultipleFiles(files, options = {}) {
    const uploadPromises = files.map(file => this.uploadFile(file, options))
    
    try {
      const results = await Promise.allSettled(uploadPromises)
      
      const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
      
      const failed = results
        .filter(result => result.status === 'rejected')
        .map(result => result.reason)

      return {
        successful,
        failed,
        totalCount: files.length,
        successCount: successful.length,
        failureCount: failed.length
      }
    } catch (error) {
      console.error('Batch upload failed:', error)
      throw new Error(`Batch upload failed: ${error.message}`)
    }
  }

  /**
   * Get storage provider status and configuration
   */
  getProviderInfo() {
    return {
      provider: this.provider,
      config: {
        ...this.config,
        // Hide sensitive information
        ...(this.config.accessKey && { accessKey: '***' }),
        ...(this.config.secretKey && { secretKey: '***' })
      },
      capabilities: this.getProviderCapabilities()
    }
  }

  /**
   * Get provider-specific capabilities
   */
  getProviderCapabilities() {
    const capabilities = {
      'aws-s3': {
        maxFileSize: '5TB',
        supportedFormats: 'All',
        features: ['Presigned URLs', 'Versioning', 'Lifecycle Management', 'CDN Integration']
      },
      'google-cloud': {
        maxFileSize: '5TB', 
        supportedFormats: 'All',
        features: ['Signed URLs', 'Versioning', 'Lifecycle Management', 'Global CDN']
      },
      'azure-blob': {
        maxFileSize: '4.75TB',
        supportedFormats: 'All', 
        features: ['SAS URLs', 'Versioning', 'Lifecycle Management', 'CDN Integration']
      },
      'local': {
        maxFileSize: 'System Dependent',
        supportedFormats: 'All',
        features: ['Development Only', 'No CDN', 'Local File System']
      }
    }

    return capabilities[this.provider] || {}
  }
}

// Export singleton instance
export default new FileStorageService()

// Export class for testing
export { FileStorageService }