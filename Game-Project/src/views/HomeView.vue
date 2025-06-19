<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchByReleaseDate, fetchByPopularity } from '../assets/api/FreeToGameApi'

const newReleases = ref([])
const popularGames = ref([])

const currentIndex = ref(0)
const visibleCount = 4 // Show 4 at a time
const scrollBy = 2     // Scroll by 2

onMounted(async () => {
  newReleases.value = await fetchByReleaseDate(20)
  popularGames.value = await fetchByPopularity(20)
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
</script>

<template>
  <main>
    <!-- Popular Games Section -->
    <section class="w-full max-w-7xl mx-auto mt-8">
      <div class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-12">
        <div>
          <h1 class="text-3xl font-bold text-gray-100 text-center mb-6">Welcome to GamePort!</h1>
          <p class="text-gray-200 text-center mb-4">
            Discover the latest and greatest games from around the world. Explore new releases, trending titles, and hidden gems.
          </p>
        </div>

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
          <!-- Left Button -->
          <button
            @click="scrollLeft"
            class="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-3 shadow hover:bg-[#748CAB] transition"
            :disabled="currentIndex === 0"
            aria-label="Scroll left"
          >
            &#8592;
          </button>

          <!-- Fixed Layout Cards -->
          <div class="flex justify-center gap-8 transition-all duration-500">
            <article
              v-for="game in visibleGames"
              :key="game.id"
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
          </div>

          <!-- Right Button -->
          <button
            @click="scrollRight"
            class="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-[#3E5C76] text-white rounded-full p-3 shadow hover:bg-[#748CAB] transition"
            :disabled="currentIndex >= popularGames.length - visibleCount"
            aria-label="Scroll right"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>

    <!-- New Releases -->
    <section class="w-full max-w-7xl mx-auto mt-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-100 text-center">New Releases</h1>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <article
          v-for="game in newReleases"
          :key="game.id"
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
      </div>
    </section>
  </main>
</template>

<style>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>