<script setup>
import { ref, onMounted, defineEmits, inject } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCategories } from '../api'; // Adjust the path as needed

const categories = ref([]);
const selectedCategory = ref('All categories');
const searchQuery = ref('');
const sorting = ref('default'); // Add sorting state
const isLoggedIn = ref(false);

// Define emitted events
const emit = defineEmits(['update:filterItem', 'update:searchTerm', 'update:sorting']);
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
  router.push('/Add-cart'); // Navigate to the cart page
};
const goToComparison = () => {
  router.push('/comparison'); // Navigate to the comparison page
};

const goToWishlist = () => {
  router.push('/wishList'); // Navigate to the wishlist page
};

const emitSearchQuery = () => {
  emit('update:searchTerm', searchQuery.value);
};

const emitCategoryFilter = () => {
  emit('update:filterItem', selectedCategory.value);
};

// Emit sorting value
const emitSorting = () => {
  emit('update:sorting', sorting.value);
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
    <select v-model="sorting" @change="emitSorting" class="sorting-filter">
      <option value="default">Sort by</option>
      <option value="low">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
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
        <i class="fas fa-shopping-bag"></i>
        <span v-if="cartItems.length" class="cart-count">{{ cartItems.length }}</span>
      </button>
      <button @click="goToWishlist" class="wishlist">
        <i class="fas fa-heart"></i>
      </button>
      <button @click="goToComparison" class="comparison">
        <i class="fas fa-exchange-alt"></i>
      </button>
      <button @click="isLoggedIn ? logout() : toggleLogin" class="login-avatar">
        <i :class="isLoggedIn ? 'fas fa-sign-out-alt' : 'fas fa-user-circle'"></i>
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

.sorting-filter {
  margin-left: 20px;
  padding: 5px;
  border-color: rgb(82, 207, 235);
}

.login-avatar {
  font-size: 24px;
}

.cart-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0 2px;
  margin-left: 3px;
}
</style>
