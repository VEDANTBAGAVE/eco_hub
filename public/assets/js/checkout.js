// checkout.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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
const db = getFirestore(app); // Initialize Firestore

// DOM Elements
const cartItems = document.querySelector(".cart-items");
const checkoutTotalPriceElement = document.getElementById(
  "checkout-total-price"
);
const checkoutForm = document.getElementById("checkout-form");

// Function to load cart from local storage for checkout
function loadCartForCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = ""; // Clear existing items

  cart.forEach((item) => {
    const checkoutItem = document.createElement("li");
    checkoutItem.classList.add("list-group-item");
    checkoutItem.innerHTML = `
      <img src="${item.image}" alt="${
      item.name
    }" style="width: 50px; height: auto; margin-right: 10px;">
      ${item.name} - $${item.price.toFixed(2)} (Quantity: ${item.quantity})
    `;
    cartItems.appendChild(checkoutItem);
  });

  updateTotalPrice();
}

// Function to update the total price in the checkout page
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutTotalPriceElement.textContent = `$${total.toFixed(2)}`; // Update the total price
}

// Load the cart on page load
loadCartForCheckout();

// Checkout form submission logic
checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Gather checkout form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const paymentMethod = document.getElementById("payment-method").value;
  const orderTotal = checkoutTotalPriceElement.textContent; // Reflects the correct total
  const orderItems = JSON.parse(localStorage.getItem("cart")) || []; // Cart items

  // Create order object
  const order = {
    name,
    email,
    address,
    paymentMethod,
    orderTotal,
    orderItems,
    orderDate: new Date().toISOString(), // Order timestamp
  };

  // Save order to Firestore
  try {
    const orderDocRef = await addDoc(collection(db, "orders"), order);

    // Save order details to local storage for bill generation
    const orderDetailsToSave = {
      orderId: orderDocRef.id, // Get the order ID from Firestore
      name: order.name,
      email: order.email,
      address: order.address,
      paymentMethod: order.paymentMethod,
      orderTotal: order.orderTotal,
      orderItems: order.orderItems,
    };

    localStorage.setItem(
      "lastOrderDetails",
      JSON.stringify(orderDetailsToSave)
    );

    alert("Order placed successfully!");

    // Clear cart from local storage after placing the order
    localStorage.removeItem("cart");
    cartItems.innerHTML = ""; // Clear cart display
    checkoutTotalPriceElement.textContent = "$0.00"; // Reset total price
    checkoutForm.reset();

    // Redirect to bill page
    window.location.href = "bill.html"; // Redirect to the bill page
  } catch (error) {
    console.error("Error placing order: ", error);
    alert("There was an error placing your order. Please try again.");
  }
});
