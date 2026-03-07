<script lang="ts" setup>
const props = defineProps<{
  to: string;
  name: string;
}>();
</script>

<template>
  <RouterLink
    :to="to"
    class="relative group font-chiron font-extralight tracking-[0.2rem] text-xl h-full flex-center px-5 border-r border-zinc-300 z-0 hover:border-primary-400"
  >
    <span class="text-primary-800 -mr-[0.2rem]">{{ name }}</span>
    <div class="absolute bg-primary-400 inset-0 duration-200 flex-center [clip-path:inset(0_0_0_100%)] group-hover:[clip-path:inset(0_-1px_0_-1px)]">
      <span class="text-primary-50 -mr-[0.2rem]">{{ name }}</span>
    </div>
  </RouterLink>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chiron+Hei+HK:ital,wght@0,200..900;1,200..900&display=swap');

.font-chiron {
  font-family: 'Chiron Hei HK', sans-serif;
}
</style>
