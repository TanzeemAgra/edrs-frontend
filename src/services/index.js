import { api } from './api'

// Authentication services
export const authService = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => api.post('/auth/logout/'),
  getUser: () => api.get('/auth/user/'),
  changePassword: (passwordData) => api.post('/auth/change-password/', passwordData),
  resetPassword: (email) => api.post('/auth/password-reset/', { email }),
  confirmPasswordReset: (data) => api.post('/auth/password-reset-confirm/', data),
}

// User services
export const userService = {
  getUsers: (params = {}) => api.get('/users/', { params }),
  getUser: (id) => api.get(`/users/${id}/`),
  updateUser: (id, userData) => api.put(`/users/${id}/`, userData),
  deleteUser: (id) => api.delete(`/users/${id}/`),
  updateProfile: (userData) => api.put('/users/profile/update/', userData),
  getProfile: () => api.get('/users/profile/'),
}

// Post services
export const postService = {
  getPosts: (params = {}) => api.get('/core/posts/', { params }),
  getPost: (slug) => api.get(`/core/posts/${slug}/`),
  createPost: (postData) => api.post('/core/posts/', postData),
  updatePost: (slug, postData) => api.put(`/core/posts/${slug}/`, postData),
  deletePost: (slug) => api.delete(`/core/posts/${slug}/`),
}

// Category services
export const categoryService = {
  getCategories: (params = {}) => api.get('/core/categories/', { params }),
  getCategory: (slug) => api.get(`/core/categories/${slug}/`),
  createCategory: (categoryData) => api.post('/core/categories/', categoryData),
  updateCategory: (slug, categoryData) => api.put(`/core/categories/${slug}/`, categoryData),
  deleteCategory: (slug) => api.delete(`/core/categories/${slug}/`),
}

// Tag services
export const tagService = {
  getTags: (params = {}) => api.get('/core/tags/', { params }),
  getTag: (id) => api.get(`/core/tags/${id}/`),
  createTag: (tagData) => api.post('/core/tags/', tagData),
  updateTag: (id, tagData) => api.put(`/core/tags/${id}/`, tagData),
  deleteTag: (id) => api.delete(`/core/tags/${id}/`),
}

// Dashboard services
export const dashboardService = {
  getStats: () => api.get('/core/dashboard/stats/'),
}

// Analytics services
export const analyticsService = {
  track: (eventData) => api.post('/core/analytics/track/', eventData),
  logActivity: (activityData) => api.post('/core/activity/log/', activityData),
}