<script setup>
import { ref, onMounted } from 'vue'
import { fetchGames } from '../api/RecentGames'

const games = ref([])

onMounted(async () => {
  games.value = await fetchGames(12) // Fetch 5 most recent games
})
</script>

<template>
  <main>
    <div>
      <div class="title"></div>
      <div class="about"></div>
    </div>

    <div class="games-list">
      <div class="games-header">
        <h1>New Releases</h1>
      </div>
      <div class="games-row">
        <div
          class="game-container"
          v-for="game in games"
          :key="game.id"
        >
          <div class="game-image">
            <img :src="game.thumbnail" :alt="game.title" />
          </div>
          <div class="game-details">
            <div class="game-title">
              <h2>{{ game.title }}</h2>
            </div>
            <div class="game-description">
              <p>{{ game.short_description }}</p>
            </div>
            <div class="game-meta">
              <div class="genre">
                <p>Genre: {{ game.genre }}</p>
              </div>
              <div class="platform">
                <p>Platform: {{ game.platform }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "../assets/HomeView.css";
</style>