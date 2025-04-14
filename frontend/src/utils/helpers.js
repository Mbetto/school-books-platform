// frontend/src/utils/helpers.js
// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Validate phone number (Kenyan format)
  export const validatePhoneNumber = (phone) => {
    const regex = /^(\+?254|0)?[71]\d{8}$/;
    return regex.test(phone);
  };
  
  // Debounce function for search inputs
  export const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };