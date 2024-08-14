<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../api'; // Import the simulated login function

const username = ref('');
const password = ref('');
const passwordVisible = ref(false);
const loading = ref(false);
const error = ref('');

const router = useRouter();

const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};

const handleLogin = async () => {
  if (!username.value || !password.value) {
    error.value = 'Username and password are required.';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    // Simulate login
    const response = await login(username.value, password.value);

    // Store JWT in local storage
    localStorage.setItem('token', response.token);

    // Redirect to the main page
    router.push('/Layout');
  } catch (err) {
    error.value = 'Failed to login. Please check your credentials.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Login</h2>
    <div>
      <label for="username">Username:</label>
      <input v-model="username" id="username" type="text" />
    </div>
    <div>
      <label for="password">Password:</label>
      <input
        v-model="password"
        :type="passwordVisible ? 'text' : 'password'"
        id="password"
      />
      <button @click="togglePasswordVisibility">
        {{ passwordVisible ? 'Hide' : 'Show' }}
      </button>
    </div>
    <button @click="handleLogin" :disabled="loading">
      {{ loading ? 'Logging in...' : 'Login' }}
    </button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<style scoped>
/* Add your styles here */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}
input {
  display: block;
  width: 100%;
  margin: 8px 0;
}
button {
  margin-top: 8px;
}
</style>
