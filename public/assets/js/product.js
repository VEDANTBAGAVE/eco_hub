// product.js
import {
  getFirestore,
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Initialize Firestore
const db = getFirestore();
const productDetailsElement = document.querySelector(".product-details");

// Function to fetch product details by ID
async function fetchProductDetails(productId) {
  try {
    const productRef = doc(db, "products", productId);
    const productSnapshot = await getDoc(productRef);

    if (productSnapshot.exists()) {
      const product = productSnapshot.data();
      displayProductDetails(product);
    } else {
      console.error("No such product!");
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

// Function to display product details in the UI
function displayProductDetails(product) {
  productDetailsElement.innerHTML = `
    <div class="card">
        <img class="card-img-top" src="${product.image}" alt="${product.name}">
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-price">Price: $${product.price.toFixed(2)}</p>
            <button class="btn btn-primary add-to-cart" data-product-id="${
              product.id
            }">Add to Cart</button>
        </div>
    </div>
  `;

  // Add event listener to "Add to Cart" button
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productData = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    };

    const existingProduct = cart.find((p) => p.productId === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push(productData);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
  });
}

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("productId");

if (productId) {
  fetchProductDetails(productId);
}
