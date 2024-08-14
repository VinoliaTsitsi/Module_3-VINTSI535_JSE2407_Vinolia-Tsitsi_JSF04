import axios from 'axios';

// Create an axios instance with the base URL and headers
const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all products from the Fake Store API.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of products.
 */
export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch details of a single product by ID.
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the product details.
 */
export const fetchProductDetails = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

/**
 * Fetch categories from the API.
 * @returns {Promise<Array>} - A promise that resolves to an array of categories.
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Log in a user and return a JWT token.
 * @param {string} username - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the JWT token.
 */
export const login = async (username, password) => {
  // Simulate authentication for specific credentials
  if (username === 'Veee' && password === '1234') {
    // Simulate a successful login with a fake JWT token
    return { token: 'fake-jwt-token' };
  } else {
    throw new Error('Invalid username or password');
  }
};
