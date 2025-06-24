<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const game = ref(null)
const loading = ref(true)

onMounted(async () => {
  const id = route.params.id
  const response = await fetch(`https://corsproxy.io/?https://www.freetogame.com/api/game?id=${id}`)  
  game.value = await response.json()
  loading.value = false
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="game">
    <h1>{{ game.title }}</h1>
    <img :src="game.thumbnail" :alt="game.title" />
    <p>{{ game.description }}</p>
    <!-- Add more details as you like -->
  </div>
  <div v-else>
    Game not found.
  </div>
</template>