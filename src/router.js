import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/Login.vue'; // Adjust the path as needed
import Layout from './components/Layout.vue'; // Adjust the path as needed
import AddCart from './components/Add-cart.vue'; // Import AddCart component
import ProductDetail from './components/ProductDetail.vue'; // Import ProductDetail component
import wishList from './components/wishList.vue'; // Import the WishList component

const routes = [
  {
    path: '/',
    redirect: '/Layout', // Redirect to Layout component by default
  },
  {
    path: '/Layout',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
  },
  {
    path: '/Add-cart',
    name: 'AddCart',
    component: AddCart,
    meta: { requiresAuth: true }, // Protected route
  },
  {
    path: '/wishList',
    name: 'wishList',
    component: wishList,
    meta: { requiresAuth: true }, // Protected route
  },
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Updated to use Vite's environment variable syntax
  routes,
});

// Navigation guard to check authentication before entering protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT token
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;
