<template>
  <div class="cart-page">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length">
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" alt="item.title" class="item-image" />
        <div class="item-details">
          <h2>{{ item.title }}</h2>
          <p>{{ item.description }}</p>
          <p>Price: ${{ item.price }}</p>
          <p>Quantity: {{ item.quantity }}</p>
          <button @click="removeItem(item.id)">Remove</button>
        </div>
      </div>
      <div class="cart-total">
        <h3>Total: ${{ cartTotal }}</h3>
      </div>
      <button @click="clearCart">Clear Cart</button>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const cartItems = computed(() => store.getters.cartItems);
const cartTotal = computed(() => store.getters.cartTotalPrice);

const removeItem = (itemId) => {
  store.dispatch('removeFromCart', itemId);
};

const clearCart = () => {
  store.dispatch('clearCart');
};
</script>

<style scoped>
/* Add your styling here */
.cart-page {
  padding: 20px;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
}

.item-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}

.item-details {
  flex: 1;
}

.cart-total {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
