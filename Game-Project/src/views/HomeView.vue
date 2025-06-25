<template>
  <main>
    <!-- Popular Games Section -->
    <section class="w-full max-w-7xl mx-auto mt-8">
      <div class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-12">

        <!-- Welcome Section -->
        <div>
          <h1 class="text-3xl font-bold text-gray-100 text-center mb-6">Welcome to GamePort!</h1>
          <p class="text-gray-200 text-center mb-4">
            Discover the latest and greatest games from around the world. Explore new releases, trending titles, and hidden gems.
          </p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex gap-4 justify-center items-center">
          <RouterLink
            to="/Games"
            class="bg-[#748CAB] text-[#1D2D44] text-center border-none px-10 py-5 rounded cursor-pointer text-base h-[40px] flex items-center justify-center box-border hover:bg-[#3E5C76] hover:text-[#F0EBD8]"
          >
            Games
          </RouterLink>

          <a
            href="#RandomGame"
            @click.prevent="goToRandomGame"
            class="bg-[#748CAB] text-[#1D2D44] text-center border-none px-10 py-5 rounded cursor-pointer text-base h-[40px] flex items-center justify-center box-border hover:bg-[#3E5C76] hover:text-[#F0EBD8]"
          >
            Random Game
          </a>
        </div>

        <header class="mb-6 mt-10">
          <h1 class="text-3xl font-bold text-gray-100 text-center">Popular Games</h1>
        </header>
        <div class="relative w-full">
          <button
            aria-label="Scroll left"
            @click="scrollLeft"
            class="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-2 shadow hover:bg-[#748CAB] transition"
            v-if="currentIndex > 0"
          >
            &lt;
          </button>
          <div v-if="loadingPopular" class="flex justify-center gap-8 transition-all duration-500">
            <div v-for="n in visibleCount" :key="n" class="w-[280px] h-[350px] bg-[#3E5C76] rounded-lg animate-pulse"></div>
          </div>
          <div v-else class="flex justify-center gap-8 transition-all duration-500">
            <router-link
              v-for="game in visibleGames"
              :key="game.id"
              :to="{ name: 'Fullpage', params: { gameTitle: game.title, id: game.id } }"
              class="no-underline"
              @mouseenter="onHover(game.id)"
              @mouseleave="onLeave(game.id)"
            >
              <article
                class="flex flex-col bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-6 w-[280px] h-[350px] transition-transform duration-200 hover:scale-105"
              >
                <div class="relative w-full h-36 mb-4 overflow-hidden rounded-md">
                  <img
                    :src="game.thumbnail"
                    :alt="game.title"
                    width="356"
                    height="201"
                    class="w-full h-full object-cover rounded-md shadow absolute top-0 left-0 transition-opacity duration-200"
                    :style="{ opacity: (hoveredGameId === game.id && videoAvailable[game.id]) ? 0 : 1 }"
                  />
                  <!-- Spinner overlay -->
                  <div
                    v-if="hoveredGameId === game.id && videoLoading[game.id] && videoAvailable[game.id] !== false"
                    class="absolute inset-0 flex items-center justify-center bg-black/40 z-10"
                  >
                    <span class="spinner"></span>
                  </div>
                  <video
                    v-show="hoveredGameId === game.id && videoAvailable[game.id] !== false"
                    ref="videoRefs"
                    :data-id="game.id"
                    class="w-full h-full object-cover rounded-md shadow absolute top-0 left-0 transition-opacity duration-200"
                    :src="`https://www.freetogame.com/g/${game.id}/videoplayback.webm`"
                    loop
                    muted
                    preload="none"
                    playsinline
                    @error="handleVideoError(game.id)"
                    @canplay="handleVideoCanPlay(game.id)"
                  ></video>
                </div>
                <div class="flex flex-col flex-1 w-full">
                  <h2 class="text-lg font-semibold text-left text-gray-100 mb-2">{{ game.title }}</h2>
                  <p class="text-xs text-gray-200 text-right mb-3 line-clamp-4">{{ game.short_description }}</p>
                  <div class="mt-auto flex justify-between text-xs text-blue-300">
                    <span>Genre: {{ game.genre }}</span>
                    <span>Platform: {{ game.platform }}</span>
                  </div>
                </div>
              </article>
            </router-link>
          </div>
          <button
            aria-label="Scroll right"
            @click="scrollRight"
            class="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-2 shadow hover:bg-[#748CAB] transition"
            v-if="currentIndex < popularGames.length - visibleCount"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>

    <!-- New Releases Section -->
    <section class="w-full max-w-7xl mx-auto mt-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-100 text-center">New Releases</h1>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <div v-if="loadingNew" v-for="n in 5" :key="n" class="w-full h-[340px] bg-[#3E5C76] rounded-lg animate-pulse"></div>
        <router-link
          v-else
          v-for="game in newReleases"
          :key="game.id"
          :to="{ name: 'Fullpage', params: { gameTitle: game.title, id: game.id } }"
          class="no-underline"
          @mouseenter="onHover(game.id)"
          @mouseleave="onLeave(game.id)"
        >
          <article
            class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            <div class="w-full h-28 mb-4 relative overflow-hidden rounded-md">
              <img
                :src="game.thumbnail"
                :alt="game.title"
                class="w-full h-full object-cover rounded-md shadow absolute top-0 left-0 transition-opacity duration-200"
                :style="{ opacity: (hoveredGameId === game.id && videoAvailable[game.id]) ? 0 : 1 }"
              />
              <!-- Spinner overlay -->
              <div
                v-if="hoveredGameId === game.id && videoLoading[game.id] && videoAvailable[game.id] !== false"
                class="absolute inset-0 flex items-center justify-center bg-black/40 z-10"
              >
                <span class="spinner"></span>
              </div>
              <video
                v-show="hoveredGameId === game.id && videoAvailable[game.id] !== false"
                ref="videoRefs"
                :data-id="game.id"
                class="w-full h-full object-cover rounded-md shadow absolute top-0 left-0 transition-opacity duration-200"
                :src="`https://www.freetogame.com/g/${game.id}/videoplayback.webm`"
                loop
                muted
                preload="none"
                playsinline
                @error="handleVideoError(game.id)"
                @canplay="handleVideoCanPlay(game.id)"
              ></video>
            </div>
            <div class="flex flex-col flex-1 w-full">
              <h2 class="text-lg font-semibold text-center text-gray-100 mb-2">{{ game.title }}</h2>
              <p class="text-xs text-gray-200 text-center mb-3 line-clamp-4">{{ game.short_description }}</p>
              <div class="mt-auto text-center">
                <p class="text-xs text-blue-300 mb-1">Genre: {{ game.genre }}</p>
                <p class="text-xs text-blue-300">Platform: {{ game.platform }}</p>
              </div>
            </div>
          </article>
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { fetchByReleaseDate, fetchByPopularity, fetchGames } from '../assets/api/FreeToGameApi'
import { useRouter } from 'vue-router'


const newReleases = ref([])
const popularGames = ref([])
const hoveredGameId = ref(null)
const videoRefs = ref([])
const videoAvailable = ref({})
const videoLoading = ref({})

const loadingPopular = ref(true)
const loadingNew = ref(true)

const currentIndex = ref(0)
const visibleCount = 4
const scrollBy = 2

const router = useRouter()
const games = ref([])

onMounted(async () => {
  loadingPopular.value = true
  loadingNew.value = true
  newReleases.value = (await fetchByReleaseDate()).slice(0, 40)
  loadingNew.value = false
  popularGames.value = (await fetchByPopularity()).slice(0, 12)
  loadingPopular.value = false
})

const visibleGames = computed(() => {
  const start = currentIndex.value
  return popularGames.value.slice(start, start + visibleCount)
})

function scrollLeft() {
  if (currentIndex.value > 0) {
    currentIndex.value = Math.max(0, currentIndex.value - scrollBy)
  }
}

function scrollRight() {
  const maxIndex = popularGames.value.length - visibleCount
  if (currentIndex.value < maxIndex) {
    currentIndex.value = Math.min(maxIndex, currentIndex.value + scrollBy)
  }
}

function onHover(id) {
  hoveredGameId.value = id
  videoLoading.value[id] = true
  nextTick(() => {
    const videos = Array.from(document.querySelectorAll('video[data-id]')).filter(v => v.dataset.id == id)
    videos.forEach(video => {
      video.currentTime = 0
      video.play()
    })
  })
}

function onLeave(id) {
  hoveredGameId.value = null
  videoLoading.value[id] = false
  nextTick(() => {
    const videos = Array.from(document.querySelectorAll('video[data-id]')).filter(v => v.dataset.id == id)
    videos.forEach(video => {
      video.pause()
      video.currentTime = 0
    })
  })
}

function handleVideoError(id) {
  videoAvailable.value[id] = false
  videoLoading.value[id] = false
}

function handleVideoCanPlay(id) {
  videoAvailable.value[id] = true
  videoLoading.value[id] = false
}

async function loadGames() {
  if (games.value.length === 0) {
    games.value = await fetchGames()
  }
}

async function goToRandomGame() {
  await loadGames()
  if (games.value.length > 0) {
    const random = games.value[Math.floor(Math.random() * games.value.length)]
    router.push({ name: 'Fullpage', params: { gameTitle: random.title, id: random.id } })
  }
}
</script>

<style>
.spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 4px solid #fff;
  border-top: 4px solid #3E5C76;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>