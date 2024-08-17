<template>
    <div>
      <h1>Your Wishlist</h1>
      <div v-if="wishlistItems.length" class="product-grid">
        <div v-for="product in wishlistItems" :key="product.id" class="product-card">
          <img :src="product.image" :alt="product.title" class="product-image" />
          <h2>{{ product.title }}</h2>
          <p>Price: R{{ product.price }}</p>
          <p>Category: {{ product.category }}</p>
          <div class="rating">
            <span v-for="n in Math.floor(product.rating.rate)" :key="n" class="star">&#9733;</span>
            <span v-for="n in (5 - Math.floor(product.rating.rate))" :key="n + 5" class="star-empty">&#9734;</span>
          </div>
          <div class="product-actions">
            <button @click="handleRemoveFromWishlist(product)" class="action-button">
              <i class="fas fa-heart-broken"></i> Remove from Wishlist
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Your wishlist is empty.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  const wishlistItems = inject('wishlistItems');
  const handleRemoveFromWishlist = inject('removeFromWishlist');
  </script>
  
  <style scoped>

  </style>
  