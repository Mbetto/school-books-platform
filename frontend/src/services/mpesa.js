import axios from 'axios';

const BASE_URL = 'https://api.example.com/mpesa'; // Replace with your actual API endpoint

const MpesaService = {
    initiatePayment: async (paymentData) => {
        try {
            const response = await axios.post(`${BASE_URL}/initiate`, paymentData);
            return response.data;
        } catch (error) {
            console.error('Error initiating payment:', error);
            throw error;
        }
    },

    checkPaymentStatus: async (transactionId) => {
        try {
            const response = await axios.get(`${BASE_URL}/status/${transactionId}`);
            return response.data;
        } catch (error) {
            console.error('Error checking payment status:', error);
            throw error;
        }
    },
};

export default MpesaService;