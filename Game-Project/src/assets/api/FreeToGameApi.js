import axios from 'axios'

const CORS_PROXY = 'https://corsproxy.io/?'
const BASE_URL = 'https://www.freetogame.com/api/games'

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

// Specific fetchers for convenience
export function fetchByReleaseDate() {
  return fetchGames({ 'sort-by': 'release-date' })
}

export function fetchByPopularity() {
  return fetchGames({ 'sort-by': 'popularity' })
}


export function fetchallgames() {
  return fetchGames()
}

