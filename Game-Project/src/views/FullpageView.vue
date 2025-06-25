<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const game = ref(null)
const loading = ref(true)
const totalImages = 3 // set to your actual image count
const videoAvailable = ref(true)
const currentMedia = ref(0)
const imagesAvailable = ref(Array(totalImages).fill(true))

const totalMedia = computed(() => videoAvailable.value ? totalImages + 1 : totalImages)

// Track if all media failed
const allMediaFailed = computed(() => {
  // If video is available, at least one media is available
  if (videoAvailable.value) return false
  // If all images are unavailable, show error
  return imagesAvailable.value.every(avail => !avail)
})

onMounted(async () => {
  const id = route.params.id
  const response = await fetch(`https://corsproxy.io/?https://www.freetogame.com/api/game?id=${id}`)  
  game.value = await response.json()
  loading.value = false
})

function prevMedia() {
  if (currentMedia.value > 0) currentMedia.value--
}

function nextMedia() {
  if (currentMedia.value < totalMedia.value - 1) currentMedia.value++
}

function handleVideoError() {
  videoAvailable.value = false
  // If we were on the video, go to first image
  if (currentMedia.value === 0) currentMedia.value = 0
}

// If video becomes unavailable and we're on the video, go to first image
watch(videoAvailable, (val) => {
  if (!val && currentMedia.value === 0) {
    currentMedia.value = 0
  }
})

function handleImageError(idx) {
  imagesAvailable.value[idx] = false
  // If the current image failed and it's being shown, check if any image is available
  if (!videoAvailable.value && imagesAvailable.value.every(avail => !avail)) {
    // All images failed, force reactivity
    imagesAvailable.value = [...imagesAvailable.value]
  }
}
</script>

<template>
  <!-- loading -->
  <section v-if="loading">
    <div class="flex flex-col items-center justify-center min-h-[40vh]">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-[#3E5C76] border-b-4 border-[#748CAB] mb-6"></div>
      <div class="text-xl text-[#3E5C76] font-semibold">Loading game data...</div>
    </div>
  </section>
  
  <section v-else-if="game">
    <div class="w-4/5 mx-auto bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-8 text-[#F0EBD8]">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
        <!-- Left: Game info -->
        <div class="md:col-span-1 flex flex-col items-center">
          <img :src="game.thumbnail" :alt="game.title" class="w-full h-auto rounded-lg mb-4 shadow" />
          <span class="bg-[#3E5C76] text-[#F0EBD8] text-xs px-3 py-1 rounded w-fit mb-2">
            Release Date: <span class="font-semibold">{{ game.release_date }}</span>
          </span>
          <span class="bg-[#3E5C76] text-[#F0EBD8] text-xs px-3 py-1 rounded w-fit mb-2">
            Publisher: <span class="font-semibold">{{ game.publisher }}</span>
          </span>
          <span class="bg-[#3E5C76] text-[#F0EBD8] text-xs px-3 py-1 rounded w-fit mb-2">
            Developer: <span class="font-semibold">{{ game.developer }}</span>
          </span>
          <span class="bg-[#748CAB] text-[#1D2D44] text-xs px-3 py-1 rounded w-fit font-semibold mb-2">
            {{ game.genre }}
          </span>
          <span class="bg-[#3E5C76] text-[#F0EBD8] text-xs px-3 py-1 rounded w-fit">
            Platform: <span class="font-semibold">{{ game.platform }}</span>
          </span>
        </div>

        <!-- Center: Title, media, description (wider) -->
        <div class="md:col-span-3 flex flex-col">
          <h1 class="text-3xl font-bold mb-4 text-center md:text-left">{{ game.title }}</h1>
          <!-- Media viewer (video or image in the same spot) -->
          <div class="flex flex-col items-center mb-4">
            <div class="w-full flex justify-center items-center min-h-[18rem]">
              <template v-if="!allMediaFailed">
                <video
                  v-if="videoAvailable && currentMedia === 0"
                  :src="`https://www.freetogame.com/g/${game.id}/videoplayback.webm`"
                  class="w-full max-w-3xl h-72 object-cover rounded-lg"
                  controls
                  playsinline
                  autoplay
                  muted
                  preload="metadata"
                  @error="handleVideoError"
                ></video>
                <img
                  v-else
                  :src="`https://www.freetogame.com/g/${game.id}/${game.title.toLowerCase().replace(/ /g, '-')}-${videoAvailable ? currentMedia : currentMedia + 1}.jpg`"
                  :alt="`${game.title} screenshot ${videoAvailable ? currentMedia : currentMedia + 1}`"
                  class="w-full max-w-3xl h-72 object-cover rounded-lg"
                  @error="handleImageError(videoAvailable ? currentMedia - 1 : currentMedia)"
                  v-show="imagesAvailable[videoAvailable ? currentMedia - 1 : currentMedia]"
                />
              </template>
              <template v-else>
                <div class="w-full max-w-3xl h-72 flex items-center justify-center bg-[#223355] rounded-lg border-2 border-[#3E5C76] text-[#748CAB] text-lg font-semibold">
                  Media couldn't be retrieved
                </div>
              </template>
            </div>
            <div class="flex gap-2 mt-2" v-if="!allMediaFailed">
              <button
                @click="prevMedia"
                :disabled="currentMedia === 0"
                class="px-3 py-2 bg-[#3E5C76] text-[#F0EBD8] rounded disabled:opacity-50"
              >&lt;</button>
              <template v-for="n in totalMedia" :key="n">
                <button
                  @click="currentMedia = n - 1"
                  :class="[
                    'w-4 h-4 rounded-full border-2 mx-1',
                    currentMedia === (n - 1) ? 'bg-[#748CAB] border-[#3E5C76]' : 'bg-[#3E5C76] border-[#748CAB]'
                  ]"
                  :aria-label="videoAvailable && n === 1 ? 'Video' : `Image ${videoAvailable ? n - 1 : n}`"
                  :disabled="n === 1 && videoAvailable === false || n > 1 && !imagesAvailable[n - (videoAvailable ? 2 : 1)]"
                ></button>
              </template>
              <button
                @click="nextMedia"
                :disabled="currentMedia === totalMedia - 1"
                class="px-3 py-2 bg-[#3E5C76] text-[#F0EBD8] rounded disabled:opacity-50"
              >&gt;</button>
            </div>
          </div>
          <!-- Game description (wider) -->
          <p class="text-base mb-4 max-w-3xl mx-auto">{{ game.description }}</p>
          <!-- Specs under description -->
          <div class="flex flex-col gap-2 mt-2 ml-auto mr-auto">
            <span class="bg-[#3E5C76] text-[#F0EBD8] text-xs px-3 py-1 rounded w-fit">
              Minimum System Requirements:
              <span class="font-semibold">
                <template v-if="game.minimum_system_requirements">
                  <ul class="list-disc ml-4">
                    <li v-if="game.minimum_system_requirements.os">OS: {{ game.minimum_system_requirements.os }}</li>
                    <li v-if="game.minimum_system_requirements.processor">CPU: {{ game.minimum_system_requirements.processor }}</li>
                    <li v-if="game.minimum_system_requirements.memory">RAM: {{ game.minimum_system_requirements.memory }}</li>
                    <li v-if="game.minimum_system_requirements.graphics">GPU: {{ game.minimum_system_requirements.graphics }}</li>
                    <li v-if="game.minimum_system_requirements.storage">Storage: {{ game.minimum_system_requirements.storage }}</li>
                  </ul>
                </template>
                <template v-else>
                  N/A
                </template>
              </span>
            </span>
          </div>
        </div>

        <div class="flex mt-15">
          <!-- rightside {play game} -->
          <div class="md:col-span-1 flex flex-col items-center" >
            <div class="text-sm text-center text-[#748CAB]">
              <p>For more information, visit the official game page.</p>
            </div>
            <a :href="game.game_url" target="_blank" rel="noopener noreferrer" class="bg-[#3E5C76] text-[#F0EBD8] px-6 py-3 rounded-lg font-semibold hover:bg-[#748CAB] transition-colors mb-4">
              Play Game
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>  

  <!-- game not found -->
  <section v-else>
    <div class="flex flex-col items-center justify-center min-h-[40vh]">
      <svg class="w-16 h-16 text-[#3E5C76] mb-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
      </svg>
      <div class="text-2xl text-[#3E5C76] font-bold mb-2">Game Not Found</div>
      <div class="text-[#748CAB]">Sorry, we couldn't find the game you're looking for.</div>
    </div>
  </section>
</template>