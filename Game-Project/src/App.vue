<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="fixed top-0 left-0 z-[1000] w-full h-[100px] flex flex-row flex-nowrap justify-center items-center bg-[#1D2D44] shadow-[0px_5px_35px_1px_#3E5C76] text-[#F0EBD8]">
    <div class="flex justify-start items-center w-full px-5 py-5">
      <div class="flex gap-2.5">
        <div class="my-auto w-[75px] h-[75px]">
          <RouterLink to="/"><img src="/GamePortLogo.png" alt="GamePort Logo"></RouterLink>
        </div>
        <div class="my-auto">
          <RouterLink to="/"><img src="/GamePortTitle.png" alt="GamePort"></RouterLink>
        </div>
      </div>
      <div class="flex gap-[30px] ml-[52%]">
        <div>
          <RouterLink to="/" class="bg-[#748CAB] text-[#1D2D44] border-none px-10 py-5 rounded cursor-pointer text-base h-[40px] flex items-center box-border hover:bg-[#3E5C76] hover:text-[#F0EBD8]">
            Home
          </RouterLink>
        </div>
        <div>
          <RouterLink to="/Games" class="bg-[#748CAB] text-[#1D2D44] border-none px-10 py-5 rounded cursor-pointer text-base h-[40px] flex items-center box-border hover:bg-[#3E5C76] hover:text-[#F0EBD8]">
            Games
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <div class="pt-40 pb-20">
    <RouterView />
  </div>
  <footer>
    <div class=" bottom-0 left-0 w-full h-[50px] flex justify-center items-center bg-[#1D2D44] text-[#F0EBD8]">
      <p class="text-sm">&copy; 2025 GamePort. All rights reserved.</p>
    </div>
  </footer>
</template>

<style>
 @import "tailwindcss";

body, html {
    background-color: #0D1321;
    color: #F0EBD8;
}
</style>