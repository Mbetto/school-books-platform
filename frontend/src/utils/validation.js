// Utility functions for form validation

/**
 * Validates if a string is an email.
 * @param {string} email - The email to validate.
 * @returns {boolean} True if valid email, otherwise false.
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates if a string meets a minimum length.
 * @param {string} value - The string to validate.
 * @param {number} minLength - The minimum length required.
 * @returns {boolean} True if valid, otherwise false.
 */
export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

/**
 * Validates if a string is not empty or only whitespace.
 * @param {string} value - The string to validate.
 * @returns {boolean} True if not empty, otherwise false.
 */
export function isNotEmpty(value) {
    return value.trim().length > 0;
}