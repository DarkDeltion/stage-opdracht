<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import Multiselect from 'vue-multiselect'
import { fetchByTags, fetchGames } from '../assets/api/FreeToGameApi'

const hoveredGameId = ref(null)
const videoRefs = ref([])
const videoAvailable = ref({})
const videoLoading = ref({})

const platforms = ['all', 'pc', 'browser']
const sorts = [
  { label: 'Release Date', value: 'release-date' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Alphabetical', value: 'alphabetical' },
  { label: 'Relevance', value: 'relevance' }
]
const tags = [
  // ...your tags...
]

const selectedTags = ref([])
const selectedPlatform = ref('all')
const selectedSort = ref('relevance')

const newReleases = ref([])
const loadingNew = ref(true)

async function fetchFilteredGames() {
  loadingNew.value = true

  if (selectedTags.value.length > 0) {
    newReleases.value = await fetchByTags({
      tags: selectedTags.value,
      platform: selectedPlatform.value,
      sort: selectedSort.value
    })
  } else {
    const params = {}
    if (selectedPlatform.value !== 'all') params.platform = selectedPlatform.value
    if (selectedSort.value) params['sort-by'] = selectedSort.value
    newReleases.value = await fetchGames(params)
  }

  loadingNew.value = false
}

onMounted(fetchFilteredGames)
watch([selectedTags, selectedPlatform, selectedSort], fetchFilteredGames)

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
</script>

<template>
  <main>
    <div class="flex flex-col lg:flex-row w-full max-w-[90%] mx-auto mt-8 gap-8">
      <!-- Tag Section -->
      <section class="fixed top-[150px] left-5 w-full lg:w-1/5">
        <div class="bg-[#223355] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4">
          <h3 class="text-lg font-semibold text-gray-100 mb-4 text-center">Filter Games</h3>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Platform</label>
            <select v-model="selectedPlatform" class="w-full h-[2.5rem] rounded p-1 bg-[#1D2D44] text-gray-100">
              <option v-for="platform in platforms" :key="platform" :value="platform">{{ platform }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Sort By</label>
            <select v-model="selectedSort" class="w-full h-[2.5rem] rounded p-1 bg-[#1D2D44] text-gray-100">
              <option v-for="sort in sorts" :key="sort.value" :value="sort.value">{{ sort.label }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-200 mb-1">Tags/Categories</label>
            <Multiselect
              v-model="selectedTags"
              :options="tags"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              placeholder="Pick tags"
              class="custom-multiselect"
              :show-labels="false"
            >
              <template #tag="{ option, remove }">
                <span
                  class="inline-flex items-center bg-blue-700 text-white text-xs px-2 py-1 rounded-full mr-1 mb-1 cursor-pointer hover:bg-blue-500 transition"
                  @click="remove(option)"
                >
                  {{ option }}
                  <span class="ml-1 text-white font-bold">&times;</span>
                </span>
              </template>
            </Multiselect>
          </div>
        </div>
      </section>

      <!-- Games Section -->
      <section class="w-full lg:w-4/5 ml-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          <div v-if="loadingNew" v-for="n in 5" :key="n" class="w-full">
            <div class="flex flex-col items-center animate-pulse bg-[#223355] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden">
              <div class="w-full h-28 mb-4 bg-gray-200 rounded-md"></div>
              <div class="flex flex-col flex-1 w-full space-y-2">
                <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="mt-auto text-center space-y-1">
                  <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
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
              <div
                class="w-full h-28 mb-4 relative overflow-hidden rounded-md"
              >
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
    </div>
  </main>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
/* ...rest of your multiselect styles... */
</style>