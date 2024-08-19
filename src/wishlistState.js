// wishlistState.js
import { ref } from 'vue';

export const wishlistItems = ref([]);

export const addToWishlist = (product) => {
  if (!wishlistItems.value.some(item => item.id === product.id)) {
    wishlistItems.value.push(product);
  }
};

export const removeFromWishlist = (product) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== product.id);
};