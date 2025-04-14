/**
 * Utility functions for Mpesa payment integration
 */

/**
 * Simulates an Mpesa payment request.
 * @param {string} phoneNumber - The phone number to charge.
 * @param {number} amount - The amount to charge.
 * @param {string} accountReference - The account reference for the transaction.
 * @returns {Promise<object>} - A promise resolving to the payment response.
 */
export async function initiateMpesaPayment(phoneNumber, amount, accountReference) {
    try {
        const response = await fetch('/api/mpesa/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phoneNumber,
                amount,
                accountReference,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to initiate Mpesa payment');
        }

        return await response.json();
    } catch (error) {
        console.error('Mpesa Payment Error:', error);
        throw error;
    }
}

/**
 * Validates a phone number for Mpesa payment.
 * @param {string} phoneNumber - The phone number to validate.
 * @returns {boolean} - True if the phone number is valid, false otherwise.
 */
export function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^254\d{9}$/; // Kenyan phone number format
    return phoneRegex.test(phoneNumber);
}