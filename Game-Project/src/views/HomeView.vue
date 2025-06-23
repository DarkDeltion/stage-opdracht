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
            href=""
            class="bg-[#748CAB] text-[#1D2D44] text-center border-none px-10 py-5 rounded cursor-pointer text-base h-[40px] flex items-center justify-center box-border hover:bg-[#3E5C76] hover:text-[#F0EBD8]"
          >
            Random Game
          </a>
        </div>

        <header class="mb-6 mt-10">
          <h1 class="text-3xl font-bold text-gray-100 text-center">Popular Games</h1>
        </header>

        <div class="relative w-full">
          <!-- Linker scrollknop voor populaire spellen -->
          <button
            @click="scrollLeft"
            class="absolute -left-10 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-3 shadow hover:bg-[#748CAB] transition"
            :disabled="currentIndex === 0"
            aria-label="Scroll left"
          >
            &#8592;
          </button>

          <!-- Skeleton loader voor populaire spellen -->
          <div v-if="loadingPopular" class="flex justify-center gap-8 transition-all duration-500">
            <div v-for="n in visibleCount" :key="n" class="w-[280px] h-[350px]">
              <div class="flex flex-col animate-pulse bg-[#223355] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-6 w-full h-full">
                <div class="w-full h-36 mb-4 bg-gray-200 rounded-md"></div>
                <div class="flex flex-col flex-1 w-full space-y-2">
                  <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-4 bg-gray-200 rounded w-full"></div>
                  <div class="mt-auto flex justify-between">
                    <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div class="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Populaire spellen kaarten -->
          <div v-else class="flex justify-center gap-8 transition-all duration-500">
            <router-link
              v-for="game in visibleGames"
              :key="game.id"
              :to="{ name: 'Fullpage', params: { gameTitle: game.title, id: game.id } }"
              class="no-underline"
            >
              <article
                class="flex flex-col bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-6 w-[280px] h-[350px] transition-transform duration-200 hover:scale-105"
              >
                <div class="w-full h-36 mb-4">
                  <img
                    :src="game.thumbnail"
                    :alt="game.title"
                    class="w-full h-full object-cover rounded-md shadow"
                  />
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

          <!-- Rechter scrollknop voor populaire spellen -->
          <button
            @click="scrollRight"
            class="absolute -right-10 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-3 shadow hover:bg-[#748CAB] transition"
            :disabled="currentIndex >= popularGames.length - visibleCount"
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>

    <!-- Nieuwe releases sectie -->
    <section class="w-full max-w-7xl mx-auto mt-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-100 text-center">New Releases</h1>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <!-- Skeleton loader voor nieuwe releases -->
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
        <!-- Nieuwe releases kaarten -->
        <router-link
          v-else
          v-for="game in newReleases"
          :key="game.id"
          :to="{ name: 'Fullpage', params: { gameTitle: game.title, id: game.id } }"
          class="no-underline"
        >
          <article
            class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden transition-transform duration-200 hover:scale-105"
          >
            <div class="w-full h-28 mb-4">
              <img
                :src="game.thumbnail"
                :alt="game.title"
                class="w-full h-full object-cover rounded-md shadow"
              />
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
// Importeer Vue functies
import { ref, computed, onMounted } from 'vue'
// Importeer API functies voor het ophalen van spellen
import { fetchByReleaseDate, fetchByPopularity } from '../assets/api/FreeToGameApi'

// State voor nieuwe releases en populaire spellen
const newReleases = ref([])
const popularGames = ref([])

// Laadstatus voor skeleton loaders
const loadingPopular = ref(true)
const loadingNew = ref(true)

// Index en aantal zichtbare spellen voor scrollen
const currentIndex = ref(0)
const visibleCount = 4 // Toon 4 tegelijk
const scrollBy = 2     // Scroll per 2

// Ophalen van data bij laden van component
onMounted(async () => {
  loadingPopular.value = true
  loadingNew.value = true
  newReleases.value = (await fetchByReleaseDate()).slice(0, 40)
  loadingNew.value = false
  popularGames.value = (await fetchByPopularity()).slice(0, 12)
  loadingPopular.value = false
})

// Berekent welke spellen zichtbaar zijn in de carrousel
const visibleGames = computed(() => {
  const start = currentIndex.value
  return popularGames.value.slice(start, start + visibleCount)
})

// Scroll functies voor de carrousel
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
</script>