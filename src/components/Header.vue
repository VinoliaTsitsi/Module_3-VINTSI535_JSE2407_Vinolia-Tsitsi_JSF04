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
    
    }
  }
}
</script>

<template>
    <div class="navbar">
      <div class="logo">

      </div>
      <div class="search-bar">
        <input type="text" placeholder="Search for products" v-model="searchQuery">
      </div>
      <div class="nav-items">
        <button @click="goToCart">Cart</button>
        <button @click="toggleLogin">{{ isLoggedIn ? 'Logout' : 'Login'}}</button>
      </div> 
    </div>
  </template>
  
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 50px;
    background-color: #f8f9fa;
  }
  
  .logo img {
    height: 40px;
  }
  
  .search-bar input {
    padding: 10px;
    width: 300px;
  }
  
  .nav-items button {
    padding: 10px 20px;
    margin-left: 10px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
  }
  </style>