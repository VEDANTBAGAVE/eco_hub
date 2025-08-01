// Cart utility functions

/**
 * Get cart from localStorage
 * @returns {Array} Cart items
 */
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items
 */
export function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Add item to cart
 * @param {Object} item - Item to add
 */
export function addToCart(item) {
  const cart = getCart();
  const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
  
  if (existingItem) {
    existingItem.quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }
  
  saveCart(cart);
}

/**
 * Remove item from cart
 * @param {string} productId - Product ID to remove
 */
export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(updatedCart);
}

/**
 * Update item quantity in cart
 * @param {string} productId - Product ID
 * @param {number} quantity - New quantity
 */
export function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Calculate cart total
 * @returns {number} Total price
 */
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

/**
 * Clear cart
 */
export function clearCart() {
  localStorage.removeItem("cart");
}

/**
 * Get cart item count
 * @returns {number} Number of items in cart
 */
export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
} 