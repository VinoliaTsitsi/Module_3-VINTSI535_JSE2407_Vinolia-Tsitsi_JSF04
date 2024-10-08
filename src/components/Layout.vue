<script setup>
// Existing imports
import { ref, computed, onMounted, provide } from 'vue';
import { fetchProducts } from '../api';
import { useRouter } from 'vue-router';
import Header from './Header.vue';
import { cartItems, addToCart } from '../cartState';
import { wishlistItems, addToWishlist, removeFromWishlist } from '../wishlistState';

const products = ref([]);
const originalProducts = ref([]);
const loading = ref(true);
const error = ref(null);
const sorting = ref('default');
const filterItem = ref('All categories');
const searchTerm = ref('');
const categories = ref([]);
const router = useRouter();

// Comparison list state
const comparisonList = ref([]);

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

// Provide cart, wishlist, and comparison state and functions
provide('cartItems', cartItems);
provide('addToCart', addToCart);
provide('wishlistItems', wishlistItems);
provide('addToWishlist', addToWishlist);
provide('removeFromWishlist', removeFromWishlist);
provide('comparisonList', comparisonList);

const filteredAndSortedProducts = computed(() => {
  let filteredProducts = [...originalProducts.value];

  if (filterItem.value !== 'All categories') {
    filteredProducts = filteredProducts.filter(product => product.category === filterItem.value);
  }

  if (searchTerm.value) {
    filteredProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

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

const updateFilterItem = (newFilterItem) => {
  filterItem.value = newFilterItem;
};

// Navigate to product details page
const viewDetails = (productId) => {
  router.push(`/product/${productId}`);
};

// Add product to cart
const handleAddToCart = (product) => {
  addToCart(product);
};

// Add product to wishlist
const handleAddToWishlist = (product) => {
  addToWishlist(product);
};

// Remove product from wishlist
const handleRemoveFromWishlist = (product) => {
  removeFromWishlist(product);
};

// Add product to comparison list
const handleAddToComparison = (product) => {
  if (!comparisonList.value.includes(product)) {
    comparisonList.value.push(product);
  } else {
    alert('Product is already in the comparison list.');
  }
};

// Navigate to comparison page
const goToComparison = () => {
  router.push('/comparison');
};

router.beforeEach((to, from) => {
  if (to.path === '/' && from.path !== '/product/:id') {
    resetFiltersAndSorting();
  }
});
</script>


<template>
  <div>
    <Header @update:searchTerm="updateSearchTerm" @update:filterItem="updateFilterItem" />

    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>

    <div v-if="filteredAndSortedProducts.length" class="product-grid">
      <div v-for="product in filteredAndSortedProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <h2>{{ product.title }}</h2>
        <p>Price: R{{ product.price }}</p>
        <p>Category: {{ product.category }}</p>
        <div class="rating">
          <span v-for="n in Math.floor(product.rating.rate)" :key="n" class="star">&#9733;</span>
          <span v-for="n in (5 - Math.floor(product.rating.rate))" :key="n + 5" class="star-empty">&#9734;</span>
        </div>
        <div class="product-actions">
          <button @click="handleAddToCart(product)" class="action-button">
            <i class="fas fa-shopping-cart"></i>
          </button>
          <button @click="viewDetails(product.id)" class="action-button">
            <i class="fas fa-info-circle"></i>
          </button>
          <button @click="handleAddToWishlist(product)" class="wishlist-button">
            <i class="fas fa-heart"></i>
          </button>
          <button @click="handleAddToComparison(product)" class="comparison-button">
            <i class="fas fa-balance-scale"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Button to go to comparison page -->
    <button @click="goToComparison" class="comparison-nav-button">
      View Comparison ({{ comparisonList.length }})
    </button>
  </div>
</template>

<style scoped>
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
  cursor: default; /* Change cursor to default */
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

.product-actions {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}

.action-button {
  background: none;
  border: 1px solid rgb(82, 207, 235);
  color: rgb(82, 207, 235);
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.action-button i {
  margin-right: 4px;
}

.action-button:hover {
  background-color: rgb(82, 207, 235);
  color: white;
}

.action-button:focus {
  outline: none;
}

.wishlist-button {
  background: none;
  border: none;
  cursor: pointer;
  color: rgb(82, 207, 235);
  font-size: 24px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  transition: color 0.2s;
  margin-top: -200px;
}

.wishlist-button:hover {
  color: rgb(95, 95, 174);
}

.wishlist-button:focus {
  outline: none;
}
</style>