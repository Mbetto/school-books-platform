export const hasMinLength = (value, min) => value.length >= min;
export const isNotEmpty = value => value.trim() !== '';
export const isNumberInRange = (value, min, max) => value >= min && value <= max;
export const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Add phone number validator
export const validatePhoneNumber = (phone) => {
  const regex = /^(?:254|\+254|0)?(7|1)\d{8}$/;
  return regex.test(phone);
};