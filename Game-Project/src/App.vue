<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="nav-header">
        <div class="logo">
          <RouterLink to="/"><img src="/GamePortLogo.png" alt="GamePort Logo"></RouterLink>
        </div>
        <div class="title">
          <RouterLink to="/"><img src="/GamePortTitle.png" alt="GamePort"></RouterLink>
        </div>
      </div>

        
      <div class="nav-links">
        <div class="home">
          <RouterLink to="/" class="button">Home</RouterLink>
        </div>
        <div class="categories">
          <RouterLink to="/categories" class="button">categories</RouterLink>
        </div>
        <div class="platform">
          <RouterLink to="/platform" class="button">platform</RouterLink>
        </div>
        <div class="tags">
          <RouterLink to="/tags" class="button">tags</RouterLink>
        </div>
        <div class="search">
          <input type="text" placeholder="Search...">
          <a href="" class="button">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1D2D44"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
            search</a>
        </div>
        <div class="random">
          <RouterLink to="/random" class="button">random</RouterLink>
        </div>
        <div class="favorites">
          <RouterLink to="/favorites" class="button">favorites</RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <div class="main-content">
    <RouterView />
  </div>
  <footer>

  </footer>
</template>

<style>
 @import "tailwindcss";
 @import "./assets/index.css";

.main-content {
  padding-top: 125px; /* Same as nav height */
}
</style>