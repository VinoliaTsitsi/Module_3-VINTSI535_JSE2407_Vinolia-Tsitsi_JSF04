<script setup>
import { ref, onMounted, defineEmits, inject } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCategories } from '../api'; // Adjust the path as needed

const categories = ref([]);
const selectedCategory = ref('All categories');
const searchQuery = ref('');
const isLoggedIn = ref(false);

// Define emitted events
const emit = defineEmits(['update:filterItem', 'update:searchTerm']);
const router = useRouter();

// Inject cart items
const cartItems = inject('cartItems');

// Fetch categories on component mount
onMounted(async () => {
  try {
    categories.value = await fetchCategories();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
});

const toggleLogin = () => {
  isLoggedIn.value = !isLoggedIn.value;
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

const goToCart = () => {
  router.push('/cart'); // Navigate to the cart page
};

const goToWishlist = () => {
  router.push('/wishlist'); // Navigate to the wishlist page
};

const emitSearchQuery = () => {
  emit('update:searchTerm', searchQuery.value);
};

const emitCategoryFilter = () => {
  emit('update:filterItem', selectedCategory.value);
};
</script>

<template>
  <div class="navbar">
    <div class="logo">
      ShopQuick
    </div>
    <select v-model="selectedCategory" @change="emitCategoryFilter" class="category-filter">
      <option value="All categories">All categories</option>
      <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
    </select>
    <div class="search-bar">
      <input 
        type="text" 
        placeholder="Search for products" 
        v-model="searchQuery" 
        @input="emitSearchQuery"
      >
    </div>
    <div class="nav-items">
      <button @click="goToCart" class="add-to-cart">
        <i class="fas fa-shopping-bag"></i> <!-- Shopping bag icon -->
        <span v-if="cartItems.length" class="cart-count">{{ cartItems.length }}</span> <!-- Cart count -->
      </button>
      <button @click="goToWishlist" class="wishlist">
        <i class="fas fa-heart"></i> <!-- Heart icon for wishlist -->
      </button>
      <button @click="isLoggedIn ? logout() : toggleLogin" class="login-avatar">
        <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-user-circle'"></i> <!-- Logout or User icon -->
      </button>
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
  width: 400px;
  border-color: rgb(82, 207, 235);
  border-radius: 25px;
}

.nav-items button {
  padding: 10px 20px;
  margin-left: 10px;
  background: none;
  color: rgb(82, 207, 235);
  border: none;
  cursor: pointer;
  font-size: 24px;
}

.category-filter {
  margin-left: 20px;
  padding: 5px;
  border-color: rgb(82, 207, 235);
}

.login-avatar {
  font-size: 24px; /* Adjust the size of the avatar icon */
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 6px;
  margin-left: 5px;
}

</style>
