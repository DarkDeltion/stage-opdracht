<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="logo"><img src="" alt=""></div>
    <div class="home">
      <RouterLink to="/">Home</RouterLink>
    </div>
    <div class="categories">
      <p>categories</p>
    </div>
    <div class="platform">
      <p>platform</p>
    </div>
    <div class="tags">
      <p>tags</p>
    </div>
    <div class="search">
      <input type="text" placeholder="Search...">
    </div>
    <div class="random">
      <p>random</p>
    </div>
    <div class="favorites">
      <p>favorites</p>
    </div>
  </nav>
  <RouterView />
  <footer>

  </footer>
</template>

<style scoped>
 @import "tailwindcss";
 @import "./assets/index.css";
</style>