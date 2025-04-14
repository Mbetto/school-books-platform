// frontend/src/services/cart.js

// Cart storage key for localStorage
const CART_STORAGE_KEY = 'bookstore_cart';

/**
 * Get cart from localStorage or initialize empty cart
 * @returns {Array} - Current cart items
 */
function getCartFromStorage() {
  const cartJson = localStorage.getItem(CART_STORAGE_KEY);
  return cartJson ? JSON.parse(cartJson) : [];
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items to save
 */
function saveCartToStorage(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Add an item to the cart or update quantity if already exists
 * @param {Object} item - The item to add (should contain id, name, price, quantity)
 * @returns {Array} - Updated cart items
 */
export function addItemToCart(item) {
  const cart = getCartFromStorage();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push({ ...item });
  }
  
  saveCartToStorage(cart);
  return cart;
}

/**
 * Remove an item from the cart
 * @param {string} itemId - The ID of the item to remove
 * @returns {Array} - Updated cart items
 */
export function removeItemFromCart(itemId) {
  const cart = getCartFromStorage().filter(item => item.id !== itemId);
  saveCartToStorage(cart);
  return cart;
}

/**
 * Update the quantity of an item in the cart
 * @param {string} itemId - The ID of the item to update
 * @param {number} quantity - The new quantity
 * @returns {Array} - Updated cart items
 * @throws {Error} - If item not found in cart
 */
export function updateItemQuantity(itemId, quantity) {
  const cart = getCartFromStorage();
  const item = cart.find(cartItem => cartItem.id === itemId);
  
  if (!item) {
    throw new Error('Item not found in cart');
  }
  
  item.quantity = quantity;
  saveCartToStorage(cart);
  return cart;
}

/**
 * Get all items in the cart
 * @returns {Array} - Current cart items
 */
export function getCartItems() {
  return getCartFromStorage();
}

/**
 * Clear all items from the cart
 * @returns {Array} - Empty cart
 */
export function clearCart() {
  saveCartToStorage([]);
  return [];
}

/**
 * Calculate the total price of items in the cart
 * @returns {number} - Total price
 */
export function calculateTotalPrice() {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get the count of unique items in the cart
 * @returns {number} - Count of unique items
 */
export function getCartItemCount() {
  return getCartFromStorage().length;
}

/**
 * Get the total quantity of all items in the cart
 * @returns {number} - Total quantity
 */
export function getTotalQuantity() {
  return getCartFromStorage().reduce((total, item) => total + item.quantity, 0);
}