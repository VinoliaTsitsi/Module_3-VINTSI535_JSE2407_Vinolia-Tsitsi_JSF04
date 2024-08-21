<template>
  <div v-if="isLoggedIn" class="comparison-page">
    <h1>Product Comparison</h1>
    <div v-if="products.length > 0">
      <button @click="removeAll" class="remove-all-btn">Remove All</button>
      <table class="comparison-table" v-if="displayProducts.length > 0">
        <thead>
          <tr>
            <th>Feature</th>
            <th v-for="product in displayProducts" :key="product.id">
              {{ product.title }}
              <button @click="removeProduct(product.id)" class="remove-btn">Remove</button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td v-for="product in displayProducts" :key="product.id">
              <img :src="product.image" :alt="product.title" class="product-image" />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td v-for="product in displayProducts" :key="product.id">{{ product.price | currency }}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td v-for="product in displayProducts" :key="product.id">{{ product.description }}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td v-for="product in displayProducts" :key="product.id">
              {{ product.rating.rate }} ({{ product.rating.count }} reviews)
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="displayProducts.length === 0">No products to compare.</p>
    </div>
    <p v-else>No products available for comparison.</p>
  </div>
  <div v-else>
    <p>Please log in to access the comparison page.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// Mock function to check login status
const isLoggedIn = ref(true); // Replace with actual login status check

const allProducts = ref([
  {
    id: 1,
    title: 'Product 1',
    image: 'https://example.com/image1.jpg',
    price: 29.99,
    category: 'Category 1',
    rating: { rate: 4.5, count: 120 },
    description: 'This is a description of product 1.',
  },
  {
    id: 2,
    title: 'Product 2',
    image: 'https://example.com/image2.jpg',
    price: 39.99,
    category: 'Category 2',
    rating: { rate: 4.0, count: 80 },
    description: 'This is a description of product 2.',
  },
  {
    id: 3,
    title: 'Product 3',
    image: 'https://example.com/image3.jpg',
    price: 49.99,
    category: 'Category 3',
    rating: { rate: 4.8, count: 150 },
    description: 'This is a description of product 3.',
  },
  {
    id: 4,
    title: 'Product 4',
    image: 'https://example.com/image4.jpg',
    price: 19.99,
    category: 'Category 4',
    rating: { rate: 4.2, count: 90 },
    description: 'This is a description of product 4.',
  },
  {
    id: 5,
    title: 'Product 5',
    image: 'https://example.com/image5.jpg',
    price: 59.99,
    category: 'Category 5',
    rating: { rate: 4.6, count: 110 },
    description: 'This is a description of product 5.',
  },
]);

const products = ref([...allProducts.value]); // Initialize with all products

const displayProducts = computed(() => {
  // Limit to 4 products for comparison
  return products.value.slice(0, 4);
});

const removeProduct = (id) => {
  products.value = products.value.filter(product => product.id !== id);
};

const removeAll = () => {
  products.value = [];
};

// Example route guard to protect the comparison page (pseudo-code)
const router = useRouter();
router.beforeEach((to, from, next) => {
  if (to.path === '/comparison' && !isLoggedIn.value) {
    next('/login'); // Redirect to login page if not logged in
  } else {
    next(); // Proceed to the requested route
  }
});
</script>

<style scoped>
.comparison-page {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: rgb(82, 207, 235);
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

.comparison-table th {
  background-color: rgb(82, 207, 235);
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.product-image {
  width: 100px;
  height: auto;
  object-fit: contain;
}

.comparison-table td {
  vertical-align: middle;
}

.comparison-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.remove-btn, .remove-all-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.remove-all-btn {
  display: block;
  margin: 20px auto;
}
</style>
