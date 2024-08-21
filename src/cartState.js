// src/cartState.js
import { ref } from 'vue';

// Initialize cart items as a reactive reference
export const cartItems = ref([]);

// Function to add a product to the cart
export const addToCart = (product) => {
  // Check if the product is already in the cart
  const existingItemIndex = cartItems.value.findIndex(item => item.id === product.id);

  if (existingItemIndex > -1) {
    // If the product is already in the cart, increase the quantity
    cartItems.value[existingItemIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it with a quantity of 1
    cartItems.value.push({ ...product, quantity: 1 });
  }

  // Update local storage
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

// Function to remove a product from the cart
export const removeFromCart = (product) => {
  const index = cartItems.value.findIndex(item => item.id === product.id);
  
  if (index !== -1) {
    // Remove the item from the cart
    cartItems.value.splice(index, 1);
    
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(cartItems.value));
  }
};

// Function to update the cart (e.g., after changing quantity)
export const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

// Function to clear all items from the cart
export const clearCart = () => {
  cartItems.value = [];
  
  // Update local storage
  localStorage.setItem('cart', JSON.stringify(cartItems.value));
};

// Function to initialize cart items from local storage on app load
export const initializeCart = () => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cartItems.value = JSON.parse(storedCart);
  }
};
