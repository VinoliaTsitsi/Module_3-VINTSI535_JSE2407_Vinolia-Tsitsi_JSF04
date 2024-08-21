<template>
    <div>
      <h1>Your Cart</h1>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="cartItems.length === 0">Your cart is empty.</div>
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" :alt="item.title" class="cart-item-image" />
          <div class="cart-item-details">
            <h2>{{ item.title }}</h2>
            <p>Price: R{{ item.price }}</p>
            <p>Quantity: 
              <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
              {{ item.quantity }}
              <button @click="increaseQuantity(item)" class="quantity-button">+</button>
            </p>
            <button @click="removeItem(item)" class="remove-button">Remove</button>
          </div>
        </div>
        <div class="cart-summary">
          <h2>Total: R{{ totalCost }}</h2>
          <button @click="clearCart" class="clear-cart-button">Clear Cart</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { cartItems } from '../cartState'; // Import cart state
  
  const loading = ref(true);
  const error = ref(null);
  
  // Fetch cart items on mount
  onMounted(() => {
    try {
      cartItems.value = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (err) {
      error.value = 'Failed to load cart.';
    } finally {
      loading.value = false;
    }
  });
  
  // Computed property to calculate total cost
  const totalCost = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  });
  
  // Function to increase item quantity
  const increaseQuantity = (item) => {
    item.quantity += 1;
    updateCart();
  };
  
  // Function to decrease item quantity
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCart();
    }
  };
  
  // Function to remove item from cart
  const removeItem = (item) => {
    const index = cartItems.value.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      cartItems.value.splice(index, 1);
      updateCart();
    }
  };
  
  // Function to clear all items from cart
  const clearCart = () => {
    cartItems.value = [];
    updateCart();
  };
  
  // Update cart in local storage
  const updateCart = () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .cart-item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 16px;
  }
  
  .cart-item-details {
    flex: 1;
  }
  
  .quantity-button {
    background: none;
    border: 1px solid #ddd;
    cursor: pointer;
    padding: 4px 8px;
    margin: 0 4px;
  }
  
  .remove-button {
    background: #f44336;
    color: white;
    border: none;
    padding: 8px;
    cursor: pointer;
  }
  
  .clear-cart-button {
    background: #2196F3;
    color: white;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
  }
  </style>
  