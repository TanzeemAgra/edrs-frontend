/**
 * Storage Configuration
 * Centralized configuration for different file storage providers
 */

// Get storage provider from environment variables
const getStorageProvider = () => {
  // Priority: Environment variable -> Default to local for development
  return process.env.VITE_STORAGE_PROVIDER || 'local'
}

// Storage provider configurations
export const storage = {
  provider: getStorageProvider(),
  
  config: {
    // AWS S3 Configuration
    'aws-s3': {
      region: process.env.VITE_AWS_REGION || 'us-east-1',
      bucket: process.env.VITE_S3_BUCKET || 'edrs-documents',
      accessKeyId: process.env.VITE_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.VITE_AWS_SECRET_ACCESS_KEY,
      endpoint: process.env.VITE_S3_ENDPOINT, // For S3-compatible services
      forcePathStyle: process.env.VITE_S3_FORCE_PATH_STYLE === 'true',
      cdnDomain: process.env.VITE_S3_CDN_DOMAIN, // CloudFront or custom CDN
      maxFileSize: 50 * 1024 * 1024 * 1024, // 50GB
      allowedTypes: [
        'application/pdf',
        'image/png', 
        'image/jpeg',
        'image/tiff',
        'application/acad',
        'application/x-autocad',
        'application/x-dwg'
      ]
    },

    // Google Cloud Storage Configuration  
    'google-cloud': {
      projectId: process.env.VITE_GCP_PROJECT_ID,
      bucket: process.env.VITE_GCS_BUCKET || 'edrs-documents',
      keyFilename: process.env.VITE_GCP_KEY_FILE, // Service account key file
      apiKey: process.env.VITE_GCP_API_KEY, // API key for client-side access
      cdnDomain: process.env.VITE_GCS_CDN_DOMAIN,
      maxFileSize: 50 * 1024 * 1024 * 1024, // 50GB
      allowedTypes: [
        'application/pdf',
        'image/png',
        'image/jpeg', 
        'image/tiff',
        'application/acad',
        'application/x-autocad',
        'application/x-dwg'
      ]
    },

    // Azure Blob Storage Configuration
    'azure-blob': {
      accountName: process.env.VITE_AZURE_ACCOUNT_NAME,
      accountKey: process.env.VITE_AZURE_ACCOUNT_KEY,
      containerName: process.env.VITE_AZURE_CONTAINER || 'edrs-documents',
      connectionString: process.env.VITE_AZURE_CONNECTION_STRING,
      cdnDomain: process.env.VITE_AZURE_CDN_DOMAIN,
      maxFileSize: 4.75 * 1024 * 1024 * 1024 * 1024, // 4.75TB
      allowedTypes: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/tiff', 
        'application/acad',
        'application/x-autocad',
        'application/x-dwg'
      ]
    },

    // Local Storage Configuration (Development)
    'local': {
      uploadPath: process.env.VITE_LOCAL_UPLOAD_PATH || '/uploads',
      baseUrl: process.env.VITE_LOCAL_BASE_URL || 'http://localhost:8001',
      maxFileSize: 100 * 1024 * 1024, // 100MB for local development
      allowedTypes: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/tiff',
        'application/acad', 
        'application/x-autocad',
        'application/x-dwg'
      ]
    },

    // MinIO Configuration (S3-Compatible Self-Hosted)
    'minio': {
      endpoint: process.env.VITE_MINIO_ENDPOINT || 'http://localhost:9000',
      accessKey: process.env.VITE_MINIO_ACCESS_KEY,
      secretKey: process.env.VITE_MINIO_SECRET_KEY,
      bucket: process.env.VITE_MINIO_BUCKET || 'edrs-documents',
      useSSL: process.env.VITE_MINIO_USE_SSL === 'true',
      maxFileSize: 50 * 1024 * 1024 * 1024, // 50GB
      allowedTypes: [
        'application/pdf',
        'image/png',
        'image/jpeg',
        'image/tiff',
        'application/acad',
        'application/x-autocad', 
        'application/x-dwg'
      ]
    }
  },

  // File organization structure
  folders: {
    documents: 'documents',
    images: 'images', 
    processed: 'processed',
    thumbnails: 'thumbnails',
    exports: 'exports',
    temp: 'temp'
  },

  // File processing options
  processing: {
    generateThumbnails: true,
    thumbnailSizes: [150, 300, 600],
    compressImages: true,
    imageQuality: 85,
    maxImageDimension: 4096,
    convertToPdf: false, // Convert images to PDF
    ocrEnabled: true, // Enable OCR for scanned documents
    virusScanEnabled: false // Enable virus scanning (requires service)
  },

  // Security and validation
  security: {
    enableChecksum: true,
    checksumAlgorithm: 'SHA-256',
    enableEncryption: false, // Client-side encryption
    encryptionKey: process.env.VITE_ENCRYPTION_KEY,
    signedUrlExpiry: 3600, // 1 hour in seconds
    maxConcurrentUploads: 5
  },

  // Performance optimization
  performance: {
    chunkSize: 5 * 1024 * 1024, // 5MB chunks for large file uploads
    enableResumableUploads: true,
    enableMultipartUpload: true,
    multipartThreshold: 100 * 1024 * 1024, // 100MB
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    enableCompression: true
  }
}

// Helper functions
export const getStorageConfig = (provider = storage.provider) => {
  return storage.config[provider] || storage.config.local
}

export const isFileTypeAllowed = (fileType, provider = storage.provider) => {
  const config = getStorageConfig(provider)
  return config.allowedTypes.includes(fileType)
}

export const isFileSizeValid = (fileSize, provider = storage.provider) => {
  const config = getStorageConfig(provider)
  return fileSize <= config.maxFileSize
}

export const getUploadUrl = (provider = storage.provider) => {
  const endpoints = {
    'aws-s3': '/api/storage/s3/upload',
    'google-cloud': '/api/storage/gcs/upload',
    'azure-blob': '/api/storage/azure/upload',
    'local': '/api/storage/local/upload',
    'minio': '/api/storage/minio/upload'
  }
  
  return endpoints[provider] || endpoints.local
}

// Export default configuration
export default storage

// Storage Provider Recommendations for Production:

/**
 * RECOMMENDED STORAGE PLATFORMS FOR EDRS:
 * 
 * 1. AWS S3 + CloudFront (RECOMMENDED)
 *    - Pros: Highly reliable, global CDN, extensive ecosystem
 *    - Cons: Can be complex to configure
 *    - Cost: ~$0.023/GB/month + transfer costs
 *    - Best for: Enterprise deployments, global users
 * 
 * 2. Google Cloud Storage + Cloud CDN
 *    - Pros: Fast, integrated with AI services, simple pricing
 *    - Cons: Smaller ecosystem than AWS
 *    - Cost: ~$0.020/GB/month + transfer costs
 *    - Best for: AI/ML integration, clean architecture
 * 
 * 3. Azure Blob Storage + Azure CDN
 *    - Pros: Great for Microsoft ecosystems, enterprise features
 *    - Cons: More complex pricing structure
 *    - Cost: ~$0.021/GB/month + transfer costs
 *    - Best for: Microsoft-centric organizations
 * 
 * 4. MinIO (Self-Hosted S3-Compatible)
 *    - Pros: Full control, no vendor lock-in, cost-effective
 *    - Cons: Requires infrastructure management
 *    - Cost: Only infrastructure costs
 *    - Best for: On-premises deployments, data sovereignty
 * 
 * 5. Cloudflare R2 (Cost-Effective)
 *    - Pros: No egress fees, S3-compatible, fast global network
 *    - Cons: Newer service, limited ecosystem
 *    - Cost: ~$0.015/GB/month, no egress fees
 *    - Best for: Cost-sensitive deployments, global distribution
 * 
 * RECOMMENDATION FOR EDRS:
 * - Development: Local storage or MinIO
 * - Production: AWS S3 + CloudFront (most mature ecosystem)
 * - Cost-Conscious: Cloudflare R2
 * - Enterprise: Azure Blob (if already using Microsoft ecosystem)
 */