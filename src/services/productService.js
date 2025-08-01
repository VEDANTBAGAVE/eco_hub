// Product Service
import { db, storage } from '../config/firebase.js';
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

/**
 * Get all products
 * @returns {Promise<Array>} Array of products
 */
export async function getAllProducts() {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    
    for (const doc of querySnapshot.docs) {
      const product = doc.data();
      products.push({
        id: doc.id,
        ...product
      });
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

/**
 * Get product by ID
 * @param {string} productId - Product ID
 * @returns {Promise<Object>} Product data
 */
export async function getProductById(productId) {
  try {
    const productRef = doc(db, "products", productId);
    const productDoc = await getDoc(productRef);
    
    if (productDoc.exists()) {
      return {
        id: productDoc.id,
        ...productDoc.data()
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

/**
 * Get product image URL
 * @param {string} imagePath - Image path in storage
 * @returns {Promise<string>} Image URL
 */
export async function getProductImageUrl(imagePath) {
  try {
    const imageRef = ref(storage, `images/${imagePath}`);
    return await getDownloadURL(imageRef);
  } catch (error) {
    console.error("Error getting image URL:", error);
    // Return a default image URL if the image doesn't exist
    return "assets/images/default-product.jpg";
  }
}

/**
 * Get products by category
 * @param {string} category - Product category
 * @returns {Promise<Array>} Array of products in category
 */
export async function getProductsByCategory(category) {
  try {
    const products = await getAllProducts();
    return products.filter(product => product.category === category);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
}

/**
 * Search products
 * @param {string} searchTerm - Search term
 * @returns {Promise<Array>} Array of matching products
 */
export async function searchProducts(searchTerm) {
  try {
    const products = await getAllProducts();
    const term = searchTerm.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
} 