<script lang="ts" setup>
import '@/index.css';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';

gsap.registerPlugin(SplitText, ScrollTrigger);
</script>

<template>
  <router-view />
</template>