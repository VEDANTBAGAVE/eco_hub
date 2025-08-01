// // Import Firestore functions correctly
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   addDoc,
// } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// // Initialize Firestore (Remove if already done in index.html)
// const db = getFirestore(); // Use the global `db` initialized in index.html

// let products = [];

// // DOM Elements
// const productList = document.querySelector(".product-list");
// const cartItems = document.querySelector(".cart-items");
// const totalPriceElement = document.getElementById("total-price");
// const searchInput = document.getElementById("search-input");
// const categoryFilter = document.getElementById("category-filter");
// const minPriceInput = document.getElementById("min-price");
// const maxPriceInput = document.getElementById("max-price");
// const checkoutForm = document.getElementById("checkout-form");

// // Function to add items to the cart
// function addToCart(event) {
//   const productId = event.target.dataset.productId;
//   const product = products.find((p) => p.id === productId);

//   if (product) {
//     const cartItem = document.createElement("li");
//     cartItem.innerHTML = `
//       ${product.name} - $${product.price.toFixed(2)}
//       <input type="number" min="1" value="1" class="quantity" data-product-id="${
//         product.id
//       }">
//       <button class="remove-from-cart" data-product-id="${
//         product.id
//       }">Remove</button>
//     `;
//     cartItems.appendChild(cartItem);

//     // Add event listener to the remove button
//     cartItem
//       .querySelector(".remove-from-cart")
//       .addEventListener("click", removeFromCart);
//     cartItem
//       .querySelector(".quantity")
//       .addEventListener("input", updateTotalPrice);
//     updateTotalPrice();
//   }
// }

// // Function to update the product list in the UI
// function updateProductList(filteredProducts) {
//   productList.innerHTML = ""; // Clear existing products

//   filteredProducts.forEach((product) => {
//     const productElement = document.createElement("div");
//     productElement.classList.add("product");

//     productElement.innerHTML = `
//       <img class="product-image" src="${product.image}" alt="${product.name}">
//       <h3 class="product-name">${product.name}</h3>
//       <p class="product-price">Price: $${product.price.toFixed(2)}</p>
//       <p class="product-description">${product.description}</p>
//       <button class="add-to-cart" data-product-id="${
//         product.id
//       }">Add to Cart</button>
//     `;

//     productList.appendChild(productElement);
//   });

//   // Add event listeners to "Add to Cart" buttons
//   document.querySelectorAll(".add-to-cart").forEach((button) => {
//     button.addEventListener("click", addToCart); // Ensure addToCart is defined here
//   });
// }

// // Fetch product data from Firestore
// async function fetchProducts() {
//   try {
//     const productsCollection = collection(db, "products"); // Use globally accessible db
//     const querySnapshot = await getDocs(productsCollection);
//     products = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     // Call the updateProductList function after fetching products
//     updateProductList(products);
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//   }
// }

// // Call the fetchProducts function to load data from Firestore
// fetchProducts();

// // Function to remove items from the cart
// function removeFromCart(event) {
//   const cartItem = event.target.closest("li");
//   cartItem.remove();
//   updateTotalPrice();
// }

// // Function to update the total price
// function updateTotalPrice() {
//   const total = Array.from(cartItems.children).reduce((sum, item) => {
//     const price = parseFloat(item.textContent.split("$")[1].split(" ")[0]);
//     const quantity = parseInt(item.querySelector(".quantity").value) || 1; // Get quantity
//     return sum + price * quantity; // Calculate total based on quantity
//   }, 0);

//   totalPriceElement.textContent = `$${total.toFixed(2)}`; // Update cart total
//   // Update the total price displayed in the checkout section
//   document.getElementById(
//     "checkout-total-price"
//   ).textContent = `$${total.toFixed(2)}`;
// }

// // Filter Functions
// function handleSearch() {
//   const searchTerm = searchInput.value.toLowerCase();
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm)
//   );
//   updateProductList(filteredProducts);
// }

// function handleCategoryFilter() {
//   const category = categoryFilter.value;
//   const filteredProducts =
//     category === "all"
//       ? products
//       : products.filter((product) => product.category === category);
//   updateProductList(filteredProducts);
// }

// function handlePriceFilter() {
//   const minPrice = parseFloat(minPriceInput.value) || 0;
//   const maxPrice = parseFloat(maxPriceInput.value) || Infinity;
//   const filteredProducts = products.filter(
//     (product) => product.price >= minPrice && product.price <= maxPrice
//   );
//   updateProductList(filteredProducts);
// }

// // Event listeners
// searchInput.addEventListener("input", handleSearch);
// categoryFilter.addEventListener("change", handleCategoryFilter);
// minPriceInput.addEventListener("input", handlePriceFilter);
// maxPriceInput.addEventListener("input", handlePriceFilter);

// // Checkout form submission logic
// checkoutForm.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   // Get form data
//   const name = document.getElementById("name").value;
//   const email = document.getElementById("email").value;
//   const address = document.getElementById("address").value;
//   const paymentMethod = document.getElementById("payment-method").value;
//   const orderTotal = totalPriceElement.textContent; // This should now reflect the correct total

//   // Get cart items
//   const orderItems = Array.from(cartItems.children).map((item) => {
//     const productId = item.querySelector(".quantity").dataset.productId;
//     const productName = item.textContent.split(" - ")[0].trim();
//     const quantity = parseInt(item.querySelector(".quantity").value);
//     return { productId, productName, quantity };
//   });

//   // Create order object
//   const order = {
//     name,
//     email,
//     address,
//     paymentMethod,
//     orderTotal,
//     orderItems,
//     orderDate: new Date().toISOString(), // Timestamp of order
//   };

//   // Save order to Firestore
//   try {
//     await addDoc(collection(db, "orders"), order);
//     alert("Order placed successfully!");

//     // Clear cart and reset form
//     cartItems.innerHTML = "";
//     updateTotalPrice(); // Reset the total price display
//     checkoutForm.reset();
//   } catch (error) {
//     console.error("Error placing order: ", error);
//     alert("There was an error placing your order. Please try again.");
//   }
// });

// Import Firestore functions
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

// Initialize Firestore and Storage
const db = getFirestore();
const storage = getStorage();

let products = [];

// DOM Elements
const productList = document.querySelector(".product-list");
const cartItems = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");
const checkoutTotalPriceElement = document.getElementById(
  "checkout-total-price"
);
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const minPriceInput = document.getElementById("min-price");
const maxPriceInput = document.getElementById("max-price");
const checkoutForm = document.getElementById("checkout-form");

// Function to fetch product data from Firestore
async function fetchProducts() {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Call the updateProductList function after fetching products
    updateProductList(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Load products on initial page load
fetchProducts();

// Function to update the product list in the UI
function updateProductList(filteredProducts) {
  productList.innerHTML = ""; // Clear existing products

  filteredProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("col-md-4", "mb-4");

    // Construct image URL
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/eco-friendly-store.appspot.com/o/images%2F${encodeURIComponent(
      product.image
    )}?alt=media`;

    productElement.innerHTML = `
      <div class="card">
        <img class="product-image card-img-top" src="${imageUrl}" alt="${
      product.name
    }">
        <div class="card-body">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">Price: $${product.price.toFixed(2)}</p>
          <button class="add-to-cart btn btn-primary" data-product-id="${
            product.id
          }">Add to Cart</button>
        </div>
      </div>
    `;

    productList.appendChild(productElement);
  });

  // Add event listeners to "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", addToCart);
  });
}

// Function to add items to the cart
function addToCart(event) {
  const productId = event.target.dataset.productId;
  const product = products.find((p) => p.id === productId);

  if (product) {
    const cartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1, // Default quantity
    };

    // Retrieve current cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.productId === productId);
    if (existingItem) {
      // If it is, increase the quantity
      existingItem.quantity += 1;
    } else {
      // If not, add it to the cart
      cart.push(cartItem);
    }

    // Save updated cart back to local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${product.name} has been added to your cart!`);
    updateCartDisplay();
  }
}

// Function to update cart display and total price
function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = ""; // Clear existing items

  // Add items to cart display
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      ${item.productName} - $${item.price.toFixed(2)} 
      <input type="number" min="1" value="${
        item.quantity
      }" class="quantity" data-product-id="${item.productId}">
      <button class="remove-from-cart" data-product-id="${
        item.productId
      }">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Event delegation for cart item actions
cartItems.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart")) {
    const productId = event.target.dataset.productId;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove item from cart
    const updatedCart = cart.filter((item) => item.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    alert("Item removed from cart!");
    updateCartDisplay();
  }
});

// Update cart display on page load
updateCartDisplay();

// Add event listeners for filter and search functionality
searchInput.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);
minPriceInput.addEventListener("input", filterProducts);
maxPriceInput.addEventListener("input", filterProducts);

// Function to filter products based on search and filter criteria
function filterProducts() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const minPrice = parseFloat(minPriceInput.value) || 0;
  const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  updateProductList(filteredProducts);
}

// Checkout function
checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for your purchase!");
  localStorage.removeItem("cart"); // Clear cart after purchase
});
