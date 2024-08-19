// src/cartState.js
import { ref } from 'vue';

export const cartItems = ref([]);

export const addToCart = (product) => {
  cartItems.value.push(product);
};