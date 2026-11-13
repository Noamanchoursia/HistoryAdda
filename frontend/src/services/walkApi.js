import { apiClient } from './apiClient'
import { walkData } from '../data/walks'

const normalizeWalk = (walk = {}) => ({
  ...walk,
  slug: walk.slug || walk.id || '',
  title: walk.title || walk.titleEn || walk.titleHi || 'Heritage walk',
  summary: walk.summary || walk.summaryEn || walk.summaryHi || '',
  image: walk.image || walk.coverImage || walk.cover_image || '/images/placeholder.webp',
})

const normalizeList = (payload) => {
  const rows = Array.isArray(payload) ? payload : Array.isArray(payload?.data) ? payload.data : Array.isArray(payload?.data?.walks) ? payload.data.walks : Array.isArray(payload?.walks) ? payload.walks : Array.isArray(payload?.items) ? payload.items : []
  return Array.isArray(rows) ? rows.map(normalizeWalk) : []
}

export const walkApi = {
  getWalks: async (language = 'en', config = {}) => {
    try {
      const response = await apiClient.get('/walks', { ...config, params: { language, ...config.params } })
      const rows = normalizeList(response.data)
      return rows.length ? rows : walkData.map(normalizeWalk)
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') throw error
      return walkData.map(normalizeWalk)
    }
  },
  getWalkBySlug: async (slug, language = 'en', config = {}) => {
    try {
      const response = await apiClient.get(`/walks/${slug}`, { ...config, params: { language, ...config.params } })
      const payload = response.data?.data || response.data?.walk || response.data
      return payload ? normalizeWalk(payload) : getLocalWalk(slug)
    } catch (error) {
      if (error.name === 'CanceledError' || error.code === 'ERR_CANCELED') throw error
      return getLocalWalk(slug)
    }
  },
}

const getLocalWalk = (slug) => walkData.find((walk) => walk.slug === slug) || null
