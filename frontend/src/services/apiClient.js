import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - could add auth token here
apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your connection and try again.',
        status: 0,
      })
    }
    return Promise.reject(error)
  }
)

export default apiClient
