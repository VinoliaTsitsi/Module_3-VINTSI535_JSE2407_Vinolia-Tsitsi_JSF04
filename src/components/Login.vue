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
        <button type="button" @click="togglePasswordVisibility">
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
      username: "",
      password: "",
      passwordFieldType: "password",
      isSubmitting: false,
      errorMessage: null,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = "Username and password are required.";
        return;
      }

      this.isSubmitting = true;
      this.errorMessage = null;

      try {
        const response = await fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("jwt", data.token);
          this.$router.push(this.$route.query.redirect || "/protected");
        } else {
          this.errorMessage = "Login failed. Please check your credentials.";
        }
      } catch (error) {
        this.errorMessage = "An error occurred. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.input-group {
  margin-bottom: 10px;
}
.error-message {
  color: red;
}
</style>
