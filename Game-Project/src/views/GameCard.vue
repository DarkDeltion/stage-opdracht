<template>
  <article
    class="flex flex-col items-center bg-[#1D2D44] rounded-lg shadow-[0px_0px_15px_5px_#3E5C76] p-4 min-h-[320px] max-h-[340px] overflow-hidden transition-transform duration-200 hover:scale-105"
    @mouseenter="onHover(game.id)"
    @mouseleave="onLeave(game.id)"
  >
    <div class="w-full h-28 mb-4 relative overflow-hidden rounded-md">
      <img
        :src="game.thumbnail"
        :alt="game.title"
        class="w-full h-full object-cover rounded-md shadow absolute top-0 left-0 transition-opacity duration-200"
        :style="{ opacity: (hoveredGameId === game.id && videoAvailable[game.id]) ? 0 : 1 }"
      />
      <div
        v-if="hoveredGameId === game.id && videoLoading[game.id] && videoAvailable[game.id] !== false"
        class="absolute inset-0 flex items-center justify-center bg-black/40 z-10"
      >
        <span class="spinner"></span>
      </div>
      <video
        v-show="hoveredGameId === game.id && videoAvailable[game.id] !== false"
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
</template>

<script setup>
defineProps(['game', 'hoveredGameId', 'videoAvailable', 'videoLoading', 'onHover', 'onLeave', 'handleVideoError', 'handleVideoCanPlay'])
</script>