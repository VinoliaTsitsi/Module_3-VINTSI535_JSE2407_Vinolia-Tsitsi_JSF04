<script setup>
/**
 * Main App Component
 * Imports and uses the Header component.
 */
import Header from './components/Header.vue';

</script>

<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<style scoped>
/* Add global styles here if needed */
</style>
