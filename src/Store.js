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
  },
  UPDATE_CART_ITEM(state, { id, quantity }) {
    const item = state.cart.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      state.itemCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
    }
  },
  REMOVE_FROM_CART(state, id) {
    state.cart = state.cart.filter(item => item.id !== id);
    state.itemCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  },
  CLEAR_CART(state) {
    state.cart = [];
    state.itemCount = 0;
  }
};

export const actions = {
  addToCart({ commit }, product) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      // Update cart in Vuex store
      commit('ADD_TO_CART', product);
      
      // Save updated cart to local storage
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state().cart));
    }
  },
  updateCart({ commit }, item) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      // Update item in Vuex store
      commit('UPDATE_CART_ITEM', item);
      
      // Save updated cart to local storage
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state().cart));
    }
  },
  removeFromCart({ commit }, id) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      // Remove item from Vuex store
      commit('REMOVE_FROM_CART', id);
      
      // Save updated cart to local storage
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state().cart));
    }
  },
  clearCart({ commit }) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      
      // Clear cart in Vuex store
      commit('CLEAR_CART');
      
      // Clear cart from local storage
      localStorage.removeItem(`cart_${userId}`);
    }
  },
  loadCart({ commit }) {
    const token = localStorage.getItem('jwt');
    if (token) {
      const { userId } = jwtDecode(token);
      let cart = JSON.parse(localStorage.getItem(`cart_${userId}`)) || [];
      
      // Load cart into Vuex store
      commit('SET_CART', cart);
    }
  }
};
