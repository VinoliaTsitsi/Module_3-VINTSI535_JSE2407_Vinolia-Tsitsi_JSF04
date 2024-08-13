<template>
  <div class="navbar">
    <div class="logo">ShopQuick</div>
    <div class="search-bar">
      <input 
        type="text" 
        placeholder="Search for products" 
        v-model="searchQuery" 
        @input="emitSearchQuery"
      >
    </div>
    <div class="nav-items">
      <button @click="goToCart">Cart</button>
      <button @click="toggleLogin">{{ isLoggedIn ? 'Logout' : 'Login' }}</button>
    </div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      searchQuery: ''
    };
  },
  methods: {
    toggleLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    },
    goToCart() {
      // Implement cart navigation
    },
    emitSearchQuery() {
      this.$emit('update:searchTerm', this.searchQuery);
    }
  }
}
</script>


<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px;
  background-color: #f8f9fa;
}

.logo {
  font-family: 'Arial', sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: rgb(82, 207, 235);
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.search-bar input {
  padding: 10px;
  width: 300px;
}

.nav-items button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: rgb(82, 207, 235);
  color: white;
  border: none;
  cursor: pointer;
}
</style>
