import axios from 'axios';

/**
 * Fetch all products from the Fake Store API.
 * @returns {Promise<Object[]>}
 */
export const fetchProducts = async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
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
export async function fetchProductDetails(productId) {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  return await response.json();
}

/**
 * Fetches categories from the API.
 * @returns {Promise<Array>} An array of categories.
 */
export async function fetchCategories() {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}
