<template>
  <NuxtLayout>
    <NuxtPage />
    <Analytics />
  </NuxtLayout>
</template>


<script setup>
import { Analytics } from '@vercel/analytics/vue';
</script>

<style scoped>
main {
  font-family: 'Inter', sans-serif;
  padding-top: 3rem;
  padding-bottom: 3rem;
  min-height: 100vh;
}
</style>
