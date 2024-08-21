<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <input
          :type="passwordFieldType"
          id="password"
          v-model="password"
          required
        />
        <button type="button" @click="togglePasswordVisibility" class="password-toggle">
          {{ passwordFieldType === 'password' ? 'Show' : 'Hide' }}
        </button>
      </div>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      passwordFieldType: 'password',
      isSubmitting: false,
      errorMessage: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = 'Username and password are required.';
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = null;

      try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('jwt', data.token);

          // Retrieve the intended path from query parameters
          const redirectPath = this.$route.query.redirect || '/Layout'; // Default redirect path
          this.$router.push(redirectPath);
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again.';
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.input-group {
  margin-bottom: 10px;
}

.password-toggle {
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  margin-left: 8px;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.error-message {
  color: red;
  font-size: 14px;
}
</style>
