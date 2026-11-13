import { apiClient } from './apiClient'

export const galleryApi = {
  getGallery: (language = 'en', config = {}) =>
    apiClient.get('/gallery', { ...config, params: { language, ...config.params } }).then((res) => res.data),
}
