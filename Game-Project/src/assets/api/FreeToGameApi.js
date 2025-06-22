import axios from 'axios'

const CORS_PROXY = 'https://corsproxy.io/?'
const BASE_URL = 'https://www.freetogame.com/api/games'

/**
 * Generic fetch function for games.
 * @param {Object} params - Query parameters (e.g., { 'sort-by': 'release-date', platform: 'pc', tag: 'shooter' })
 * @param {number} limit - Limit the number of results
 */
export async function fetchGames(params = {}, limit = 12) {
  const query = new URLSearchParams(params).toString()
  const url = `${CORS_PROXY}${BASE_URL}${query ? `?${query}` : ''}`
  const response = await axios.get(url)
  return response.data.slice(0, limit)
}

// Specific fetchers for convenience
export function fetchByReleaseDate(limit = 12) {
  return fetchGames({ 'sort-by': 'release-date' }, limit)
}

export function fetchByPopularity(limit = 12) {
  return fetchGames({ 'sort-by': 'popularity' }, limit)
} 