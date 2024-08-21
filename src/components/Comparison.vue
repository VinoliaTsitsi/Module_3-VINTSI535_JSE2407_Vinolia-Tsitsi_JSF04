<template>
    <div class="comparison-page">
      <h1>Product Comparison</h1>
      <table class="comparison-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th v-for="product in products" :key="product.id">{{ product.title }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Image</td>
            <td v-for="product in products" :key="product.id">
              <img :src="product.image" :alt="product.title" class="product-image" />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td v-for="product in products" :key="product.id">{{ product.price | currency }}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td v-for="product in products" :key="product.id">{{ product.category }}</td>
          </tr>
          <tr>
            <td>Rating</td>
            <td v-for="product in products" :key="product.id">{{ product.rating.rate }} ({{ product.rating.count }} reviews)</td>
          </tr>
          <tr>
            <td>Description</td>
            <td v-for="product in products" :key="product.id">{{ product.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const products = ref([
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
    // Add more products as needed
  ]);
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
  </style>
  