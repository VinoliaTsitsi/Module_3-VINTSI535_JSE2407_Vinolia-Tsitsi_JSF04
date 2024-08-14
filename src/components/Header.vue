<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { fetchCategories } from '../api'; // Adjust the path as needed

const categories = ref([]);
const selectedCategory = ref('All categories');
const searchQuery = ref('');
const isLoggedIn = ref(false);

// Define emitted events
const emit = defineEmits(['update:filterItem', 'update:searchTerm']);
const router = useRouter();

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
  // Implement cart navigation
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
      </button>
      <button @click="isLoggedIn ? logout() : toggleLogin">
        {{ isLoggedIn ? 'Logout' : 'Login' }}
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
  border-radius: 25px ;
}

.nav-items button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: rgb(82, 207, 235);
  color: white;
  border: none;
  cursor: pointer;
}
.add-to-cart {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 24px; /* Adjust size as needed */
  color: #000; /* Adjust color as needed */
}
.category-filter {
  margin-left: 20px;
  padding: 5px;
  border-color: rgb(82, 207, 235);
}
</style>
