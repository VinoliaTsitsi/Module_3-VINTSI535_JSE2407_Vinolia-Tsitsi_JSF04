// store/cart.js

import jwtDecode from 'jwt-decode';

export const state = () => ({
  cart: [],
  itemCount: 0
});

export const mutations = {
  SET_CART(state, cart) {
    state.cart = cart;
    state.itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  },
  ADD_TO_CART(state, product) {
    const existingItemIndex = state.cart.findIndex(item => item.id === product.id);

    if (existingItemIndex > -1) {
      
      state.cart[existingItemIndex].quantity += 1;
    } else {
       
      state.cart.push({ ...product, quantity: 1 });
    }
    state.itemCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  }
};

export const actions = {
  addToCart({ commit }) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      commit('SET_CART', cart);
    }
  },
  updateCart({ commit }) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      commit('SET_CART', cart);
    }
  }
};
