<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';

const btns = [
  { to: '/about', name: '關於' },
  { to: '/projects', name: '專案' },
  { to: '/contact', name: '聯絡' },
  { to: '/docs', name: '文檔' },
];
</script>

<template>
    <Header :btns="btns" />

    <div class="bg-white h-svh w-dvw flex-center overflow-hidden">
        <img src="@/assets/images/home/img.webp" alt="Backgroud Image" class="h-full translate-y-20 object-cover scale-110 -z">
        <h1 class="md:text-[14vw] lg:text-[12vw] xl:text-[10vw] text-[18vw] absolute top-1/6 md:left-1/12 font-league select-none">Zyreny</h1>

      <div class="absolute bottom-0 w-full border-b-primary-800 border-b-2 border-t-primary-800 border-t-2">
        <Vue3Marquee :clone="true" :duration="1.5">
          <h1 class="text-3xl font-bold text-primary-800 mr-8 my-1">SCROLL</h1>
          <s-arrow-down-circle class="text-primary-800 text-2xl w-auto mr-8" />
        </Vue3Marquee>
      </div>
    </div>

    <div class="h-dvh bg-primary-400">
      <h1>關於我</h1>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?&family=Climate+Crisis&text=Zyreny&display=swap');

.font-league {
  font-family: 'Climate Crisis', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue' , sans-serif;
}
</style>