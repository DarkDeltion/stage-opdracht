<script setup>
import { ref, onMounted } from 'vue'
// Importeer de juiste API functie
import { fetchallgames } from '../assets/api/FreeToGameApi'

const newReleases = ref([])
const loadingNew = ref(true)

onMounted(async () => {
  loadingNew.value = true
  newReleases.value = await fetchallgames()
  loadingNew.value = false
})
</script>

<template>
  <main>
    <section class="w-full max-w-7xl mx-auto mt-8">
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
