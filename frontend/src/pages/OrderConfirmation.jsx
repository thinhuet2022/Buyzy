import React, {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import OrderDetails from '../components/order/OrderDetails';
import OrderItems from '../components/order/OrderItems';
import OrderSummary from '../components/checkout/OrderSummary';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Try to get order from location state first
        const orderFromState = location.state?.order;
        
        // If not in location state, try to get from sessionStorage
        if (!orderFromState) {
            const orderFromStorage = sessionStorage.getItem('currentOrder');
            if (orderFromStorage) {
                try {
                    setOrder(JSON.parse(orderFromStorage));
                } catch (error) {
                    console.error('Error parsing order from storage:', error);
                }
            }
        } else {
            setOrder(orderFromState);
        }
        
        // Clean up sessionStorage after getting the order
        sessionStorage.removeItem('currentOrder');
        sessionStorage.removeItem('pendingOrderId');
        
        setLoading(false);
    }, [location.state]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
                    <p className="text-gray-600 mb-4">We couldn't find your order details.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    const subtotal = order?.orderItems?.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    ) ?? 0;
    
    const shipping = 10.0;
    const tax = subtotal * 0.03;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    className="text-center mb-12"
                >
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                        <svg
                            className="h-6 w-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-lg text-gray-600">
                        Thank you for your purchase. We've sent a confirmation email to your
                        registered email address.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8 text-left">
                        <OrderDetails order={order}/>
                        <OrderItems items={order.orderItems}/>
                    </div>

                    <div className="lg:col-span-1">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            total={total}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation; 