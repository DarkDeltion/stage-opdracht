import axios from 'axios'

const CORS_PROXY = 'https://corsproxy.io/?'
const BASE_URL = 'https://www.freetogame.com/api/games'
const FILTER_URL = 'https://www.freetogame.com/api/filter'

/**
 * Generic fetch function for games.
 * @param {Object} params - Query parameters (e.g., { 'sort-by': 'release-date', platform: 'pc', tag: 'shooter' })
 */
export async function fetchGames(params = {}) {
  const query = new URLSearchParams(params).toString()
  const url = `${CORS_PROXY}${BASE_URL}${query ? `?${query}` : ''}`
  const response = await axios.get(url)
  return response.data
}

export function fetchallgames() {
  return fetchGames()
}

// Specific fetchers for convenience
export function fetchByReleaseDate() {
  return fetchGames({ 'sort-by': 'release-date' })
}

export function fetchByPopularity() {
  return fetchGames({ 'sort-by': 'popularity' })
}

export async function fetchByTags({ tags = [], platform = '', sort = '' } = {}) {
  if (!tags.length) return []
  const params = {}
  params.tag = tags.join('.')
  if (platform && platform !== 'all') params.platform = platform
  if (sort) params['sort-by'] = sort
  const query = new URLSearchParams(params).toString()
  const url = `${CORS_PROXY}${FILTER_URL}?${query}`
  const response = await axios.get(url)
  return response.data
}