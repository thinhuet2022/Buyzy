import React, {useState} from 'react';
import {motion} from 'framer-motion';
import OrderDetails from '../components/order/OrderDetails';
import OrderItems from '../components/order/OrderItems';
import OrderSummary from '../components/checkout/OrderSummary';
import { useLocation } from 'react-router-dom';
const OrderConfirmation = () => {
    const location = useLocation();
    const order = location.state.order;
    console.log(order);
    

    const subtotal = order.orderItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
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