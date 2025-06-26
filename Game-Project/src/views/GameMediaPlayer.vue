<template>
  <div class="flex flex-col items-center mb-4">
    <div class="w-full flex justify-center items-center min-h-[18rem]">
      <template v-if="!allMediaFailed">
        <video
          v-if="videoAvailable && currentMedia === 0"
          :src="videoUrl"
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
          :src="imageUrl(videoAvailable ? currentMedia : currentMedia + 1)"
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
</template>

<script setup>
defineProps([
  'game', 'videoAvailable', 'currentMedia', 'imagesAvailable', 'allMediaFailed',
  'videoUrl', 'imageUrl', 'totalMedia', 'prevMedia', 'nextMedia', 'handleVideoError', 'handleImageError'
])
</script>