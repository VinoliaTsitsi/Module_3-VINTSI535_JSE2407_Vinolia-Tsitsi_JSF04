<template>
  <div>
    <Header @update:searchTerm="updateSearchTerm" />

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <div class="filters">
      <select v-model="sorting" class="p-2 border border-gray-300 rounded">
        <option value="default">Default</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
      </select>

      <select v-model="filterItem" class="p-2 border border-gray-300 rounded">
        <option value="All categories">All categories</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>

    <div v-if="filteredAndSortedProducts.length" class="product-grid">
      <router-link
        v-for="product in filteredAndSortedProducts"
        :key="product.id"
        :to="`/product/${product.id}`"
        class="product-card"
      >
        <img :src="product.image" :alt="product.title" class="product-image" />
        <h2>{{ product.title }}</h2>
        <p>Price: R{{ product.price }}</p>
        <p>Category: {{ product.category }}</p>
        <div class="rating">
          <span v-for="n in Math.floor(product.rating.rate)" :key="n" class="star">&#9733;</span>
          <span v-for="n in (5 - Math.floor(product.rating.rate))" :key="n + 5" class="star-empty">&#9734;</span>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { fetchProducts } from '../api';
import { useRouter, useRoute } from 'vue-router';
import Header from './Header.vue'; // Adjust the path as needed

const products = ref([]);
const originalProducts = ref([]);
const loading = ref(true);
const error = ref(null);
const sorting = ref('default');
const filterItem = ref('All categories');
const searchTerm = ref('');
const categories = ref([]);
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  try {
    const fetchedProducts = await fetchProducts();
    products.value = fetchedProducts;
    originalProducts.value = fetchedProducts;
    categories.value = [...new Set(fetchedProducts.map(p => p.category))];
  } catch (err) {
    error.value = 'Failed to fetch products.';
  } finally {
    loading.value = false;
  }
});

const filteredAndSortedProducts = computed(() => {
  let filteredProducts = [...originalProducts.value];

  // Filter by category
  if (filterItem.value !== 'All categories') {
    filteredProducts = filteredProducts.filter(product => product.category === filterItem.value);
  }

  // Filter by search term
  if (searchTerm.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  // Sort products
  if (sorting.value === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sorting.value === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
});

const resetFiltersAndSorting = () => {
  filterItem.value = 'All categories';
  sorting.value = 'default';
  searchTerm.value = '';
};

const updateSearchTerm = (newSearchTerm) => {
  searchTerm.value = newSearchTerm;
};

// Reset filters and sorting when navigating to home
router.beforeEach((to, from) => {
  if (to.path === '/' && from.path !== '/product/:id') {
    resetFiltersAndSorting();
  }
});
</script>

<style scoped>
/* Add your existing styles here */
.product-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 16px;
}

.product-card {
  border: 1px solid rgb(206, 181, 148);
  padding: 16px;
  border-radius: 8px;
  background-color: white#a373b155;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: block;
  text-align: left;
  width: 90%;
  border: none;
  text-decoration: none; /* Remove underlining */
  color: inherit; /* Maintain text color */
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  background-color: rgb(243, 241, 244);
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #f0f0f0;
}

.product-card h2 {
  font-size: 18px;
  margin-bottom: 8px;
  text-decoration: none;
}

.product-card p {
  margin-bottom: 8px;
  text-decoration: none;
}

.rating {
  display: flex;
  margin-bottom: 8px;
}

.star {
  color: gold;
  margin-right: 2px;
}

.star-empty {
  color: #ccc;
  margin-right: 2px;
}

.add-to-cart {
  display: block;
  width: 80%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart:hover {
  background-color: #45a049;
}
</style>
