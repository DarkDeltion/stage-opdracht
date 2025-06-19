<script setup>
import { ref, onMounted } from 'vue'
import { fetchGames } from '../assets/api/RecentGames'

const games = ref([])

onMounted(async () => {
  games.value = await fetchGames(20) // Fetch 12 most recent games
})
</script>

<!-- gameport -->
<template>
  <main>
    <section class="w-full max-w-7xl mx-auto mt-8">
      <div class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-100 text-center mb-6">Welcome to GamePort!</h1>
          <p class="text-gray-200 text-center mb-4">
            Discover the latest and greatest games from around the world. Explore new releases, trending titles, and hidden gems.
          </p>
        </div>
        <!-- populair games -->

        <div>

        </div>
      </div>
    </section>
    <section class="w-full max-w-7xl mx-auto mt-8">
      <header class="mb-6">
        <h1 class="text-3xl font-bold text-gray-100 text-center">New Releases</h1>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <article
          v-for="game in games"
          :key="game.id"
          class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden"        >
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