// src/router/index.js or src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/Login.vue'; // Adjust the path as needed
import HomePage from './components/Layout.vue'; // Adjust the path as needed
import AddCart from './components/Add-cart.vue';
import ProductDetail from './components/ProductDetail.vue'; // Import ProductDetail component
import wishList from './components/wishList.vue'; // Import the WishList component

const routes = [
  {
    path: '/',
    redirect: '/login' // Redirect to login page by default
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/wishList',
    name: 'wishList',
    component: wishList
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: HomePage,
    meta: { requiresAuth: true } // Example meta field for protected routes
  },
  {
    path: '/Add-cart',
    component: AddCart,
    beforeEnter: (to, from, next) => {
      const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT token
      if (isAuthenticated) {
        next();
      } else {
        next('/login'); // Redirect to login if not authenticated
      }
    }
  },
  {
    path: '/product/:id', // Dynamic segment for product ID
    name: 'ProductDetail',
    component: ProductDetail,
    meta: { requiresAuth: true } // Example meta field for protected routes
  }
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Updated to use Vite's environment variable syntax
  routes
});

// Navigation guard to check authentication before entering protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
