// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzoFv_eiYF9MiwCwAKeFUZTwBnrPtxHHE",
  authDomain: "eco-friendly-store.firebaseapp.com",
  projectId: "eco-friendly-store",
  storageBucket: "eco-friendly-store.appspot.com",
  messagingSenderId: "809792193062",
  appId: "1:809792193062:web:320478197ae3123b991ce7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get product ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

// DOM Elements
const productNameElement = document.getElementById("product-name");
const productDescriptionElement = document.getElementById(
  "product-description"
);
const productPriceElement = document.getElementById("product-price");
const productStockElement = document.getElementById("product-stock");
const productImageElement = document.getElementById("product-image");

// Function to load product details from Firestore
async function loadProductDetails() {
  const productRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productRef);

  if (productSnapshot.exists()) {
    const product = productSnapshot.data();

    // Set the product details in the HTML
    productNameElement.textContent = product.name;
    productDescriptionElement.textContent = product.description;
    productPriceElement.textContent = product.price.toFixed(2);
    productStockElement.textContent = product.stock;
    productImageElement.src = `https://firebasestorage.googleapis.com/v0/b/eco-friendly-store.appspot.com/o/images%2F${encodeURIComponent(
      product.image
    )}?alt=media`;
  } else {
    console.error("Product not found");
    productNameElement.textContent = "Product not found";
  }
}

// Function to handle adding to cart
function addToCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = {
    productId,
    name: productNameElement.textContent,
    price: parseFloat(productPriceElement.textContent),
    image: productImageElement.src,
    quantity: 1, // Default quantity
  };

  const existingProduct = cart.find((p) => p.productId === productId);
  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if already in cart
  } else {
    cart.push(product); // Add new product to cart
  }

  localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
  alert("Product added to cart"); // Show confirmation
}

// Load product details when the page loads
loadProductDetails();

// Add event listener to the "Add to Cart" button
const addToCartButton = document.getElementById("add-to-cart");
addToCartButton.addEventListener("click", addToCart);
