<script lang="ts" setup>
// import logo from '@/assets/images/logo_full_white.svg';
import NavBtn from './NavBtn.vue';

const { btns = [{ to: '/', name: '首頁' }] } = defineProps<{
  btns: { to: string; name: string }[];
}>();
</script>

<template>
  <header
    class="bg-white border-b border-zinc-300 px-15 flex-between h-13 w-full fixed z-2"
  >
    <RouterLink to="#" class="h-full flex-center">
      <img
        src="@/assets/images/logo_full.svg"
        alt="Logo"
        class="h-2/3 w-auto"
      />
    </RouterLink>
    <nav class="h-full flex-center">
      <NavBtn v-for="btn in btns" :key="btn.to" :to="btn.to" :name="btn.name" />
    </nav>
  </header>
</template>
