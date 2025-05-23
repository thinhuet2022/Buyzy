import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {FaCheckCircle, FaTimesCircle} from 'react-icons/fa';
import cartService from '../services/cartService';

const PaymentCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('processing');
    const [error, setError] = useState(null);
    const result = searchParams.get('status');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                // Get the order data and items to remove from localStorage
                const orderData = localStorage.getItem('currentOrder');
                const itemsToRemove = localStorage.getItem('itemsToRemove');
                // Add detailed logging
                console.log('Payment Callback Debug Info:');
                console.log('Search Params:', Object.fromEntries(searchParams.entries()));
                console.log('Order Data from localStorage:', orderData);
                console.log('Items to Remove from localStorage:', itemsToRemove);
                if ((!orderData || !itemsToRemove)) {
                    console.error('Missing data in localStorage:');
                    console.error('Order data:', orderData);
                    console.error('Items to remove:', itemsToRemove);
                    throw new Error('No order data or items to remove found. Please try again later.');
                }

                let order;
                let items;
                try {
                    order = JSON.parse(orderData);
                    items = JSON.parse(itemsToRemove);
                } catch (parseError) {
                    console.error('Error parsing localStorage data:', parseError);
                    throw new Error('Invalid order data format. Please contact support.');
                }

                if (result === '00') {
                    // Payment successful
                    try {
                        // Try to clear cart with retry logic
                        if(items.length > 0) {
                            console.log('Clearing cart');
                            const cartCleared = await cartService.clearCartItems(items);
                            if (!cartCleared) {
                                console.warn('Failed to clear cart after multiple attempts');
                            }
                        }
                        // Clean up localStorage
                        // localStorage.removeItem('itemsToRemove');
                        // localStorage.removeItem('currentOrder');
                    } catch (error) {
                        console.error('Error clearing cart:', error);
                        // Don't block the success flow if cart clearing fails
                    }
                    
                    setStatus('success');
                    
                    // Navigate to order confirmation with the order data
                    setTimeout(() => {
                        navigate('/order-confirmation', {
                            state: { order }
                        });
                    }, 2000);
                } else {
                    setStatus('failed');
                    setError('Payment verification failed. Please contact support.');
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setStatus('failed');
                setError(error.message || 'Payment verification failed. Please contact support.');
            }
        };

        verifyPayment();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                {status === 'processing' && (
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">
                            Verifying Payment...
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Please wait while we verify your payment.
                        </p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="text-center">
                        <FaCheckCircle className="h-12 w-12 text-green-500 mx-auto"/>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">
                            Payment Successful!
                        </h2>
                        <p className="mt-2 text-gray-600">
                            Redirecting to order confirmation...
                        </p>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="text-center">
                        <FaTimesCircle className="h-12 w-12 text-red-500 mx-auto"/>
                        <h2 className="mt-4 text-xl font-semibold text-gray-900">
                            Payment Failed
                        </h2>
                        <p className="mt-2 text-red-600">
                            {error}
                        </p>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentCallback; 