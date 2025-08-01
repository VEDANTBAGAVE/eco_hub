// cart.js
const cartItems = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");

// Function to load cart from local storage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = ""; // Clear existing items

  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.classList.add("list-group-item");

    // Use default values to avoid TypeError
    const itemName = item.name || "Unknown Product"; // Default name
    const itemPrice =
      item.price !== undefined && item.price !== null ? item.price : 0; // Default price of 0
    const itemQuantity = item.quantity || 1; // Default quantity is 1
    const itemImage = item.image || "path/to/default/image.jpg"; // Placeholder image

    cartItem.innerHTML = `
      <img src="${itemImage}" alt="${itemName}" style="width: 50px; height: auto; margin-right: 10px;">
      ${itemName} - $${itemPrice.toFixed(2)} 
      <input type="number" min="1" value="${itemQuantity}" class="quantity" data-product-id="${
      item.productId
    }">
      <button class="remove-from-cart btn btn-danger btn-sm" data-product-id="${
        item.productId
      }">Remove</button>
    `;
    cartItems.appendChild(cartItem);
  });

  // Add event listeners to remove buttons
  addRemoveListeners();
  updateTotalPrice();
}

// Function to update the total price
function updateTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => {
    const price = item.price || 0; // Default to 0 if undefined
    const quantity = item.quantity || 0; // Default to 0 if undefined
    return sum + price * quantity; // Calculate total based on quantity
  }, 0);
  totalPriceElement.textContent = `$${total.toFixed(2)}`; // Update total price
}

// Function to add event listeners to remove buttons
function addRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-from-cart");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });

  const quantityInputs = document.querySelectorAll(".quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });
}

// Function to remove items from the cart
function removeFromCart(event) {
  const productId = event.target.dataset.productId;

  // Retrieve current cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.productId !== productId); // Remove item from cart

  // Save updated cart back to local storage and reload cart display
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// Function to update the quantity of an item
function updateQuantity(event) {
  const productId = event.target.dataset.productId;
  const newQuantity = parseInt(event.target.value) || 1; // Ensure a default value

  // Retrieve current cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((p) => p.productId === productId);

  if (item) {
    item.quantity = newQuantity; // Update quantity
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    updateTotalPrice(); // Update total price
  }
}

// Call the loadCart function when the page loads
loadCart();
