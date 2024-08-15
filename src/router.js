// src/router/index.js or src/router.js

import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/Login.vue'; // Adjust the path as needed
import HomePage from './components/Layout.vue'; // Adjust the path as needed

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
    path: '/Layout',
    name: 'Layout',
    component: HomePage,
    meta: { requiresAuth: true } // Example meta field for protected routes
  },

  // In your router configuration
{
  path: '/cart',
  component: CartPage,
  beforeEnter: (to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT token
    if (isAuthenticated) {
      next();
    } else {
      next('/login'); // Redirect to login if not authenticated
    }
  }
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
