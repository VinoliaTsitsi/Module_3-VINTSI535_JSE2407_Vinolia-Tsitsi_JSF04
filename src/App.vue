<script setup>
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

// Use router to redirect if needed
const router = useRouter();

onMounted(() => {
  // Redirect to login if not authenticated (for example)
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    router.push('/login');
  }
});
</script>

<template>
  <div>
    <router-view />
  </div>
</template>

<style scoped>
/* Global styles here */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

div {
  padding: 0;
}
</style>
