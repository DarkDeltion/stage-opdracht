import axios from 'axios'

const CORS_PROXY = 'https://corsproxy.io/?'
const API_URL = 'https://www.freetogame.com/api/games?sort-by=release-date'

export async function fetchGames(limit = 12) {
  const response = await axios.get(CORS_PROXY + API_URL)
  return response.data.slice(0, limit)
}