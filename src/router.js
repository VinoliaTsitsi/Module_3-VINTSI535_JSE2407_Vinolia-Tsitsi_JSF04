import { createRouter, createWebHistory } from 'vue-router';
import Layout from './components/Layout.vue';
import ProductDetails from './components/ProductDetail.vue'

const routes = [

  {
    path: '/',
    name: 'Layout',
    component: Layout,
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
  }
];

const router = createRouter({
  history: createWebHistory(''),
  routes,
});

export default router;
