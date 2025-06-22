<script>
import { ref, computed, onMounted } from 'vue'
// Importeer API functies voor het ophalen van spellen
import { fetchByReleaseDate, fetchByPopularity } from '../assets/api/FreeToGameApi'

// state voor alle games
const games = ref([])

// Laadstatus voor skeleton loaders
const loadingGames = ref(true)

// Ophalen van data bij laden van component
onMounted(async () => {
  loadingGames.value = true
  games.value = await fetchByReleaseDate(40) // Of een andere API functie
  loadingGames.value = false
})
</script>

<template>
  <main>
    <h1>Games</h1>
    
  </main>
</template>
