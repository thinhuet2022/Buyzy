import React from 'react';
import {motion} from 'framer-motion';

const OrderDetails = ({order}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'processing':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                </div>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                    )}`}
                >
          {order.status}
        </span>
            </div>

            <div className=" flex justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-500">Shipping Address</h3>
                    <p className="mt-1 text-sm text-gray-900">
                        {order.shippingAddress.street + ' '}
                        {order.shippingAddress.city + ' '}{order.shippingAddress.state + ' '}
                        {order.shippingAddress.zipCode},
                        {' ' + order.shippingAddress.country}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                    <div className="mt-1 flex items-center">
                        <div className="flex-shrink-0">
                            {order.paymentMethod === 'credit_card' ? (
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v2h16V6H4zm0 4v8h16v-8H4zm2 2h12v4H6v-4z"/>
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z"/>
                                </svg>
                            )}
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                                {order.paymentMethod === 'credit_card'
                                    ? `•••• ${order.cardLastFour}`
                                    : 'PayPal'}
                            </p>
                            <p className="text-sm text-gray-500">
                                {order.paymentMethod === 'credit_card'
                                    ? 'Credit Card'
                                    : 'PayPal Account'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OrderDetails; 