import React, {useState} from 'react';
import {motion} from 'framer-motion';
import OrderDetails from '../components/order/OrderDetails';
import OrderItems from '../components/order/OrderItems';
import OrderSummary from '../components/checkout/OrderSummary';

const OrderConfirmation = () => {
    const [order] = useState({
        id: 'ORD-12345',
        date: new Date().toISOString(),
        status: 'Processing',
        shippingAddress: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            zipCode: '10001',
            country: 'United States',
        },
        paymentMethod: 'credit_card',
        cardLastFour: '4242',
        items: [
            {
                id: 1,
                name: 'Premium Wireless Headphones',
                brand: 'AudioTech',
                price: 299.99,
                originalPrice: 399.99,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
            },
            {
                id: 2,
                name: 'Smart Watch Pro',
                brand: 'TechWear',
                price: 249.99,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
            },
        ],
    });

    const subtotal = order.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    const shipping = 10.0;
    const tax = subtotal * 0.1;
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
                        <OrderItems items={order.items}/>
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