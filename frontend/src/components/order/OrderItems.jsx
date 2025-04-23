import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {formatCurrency} from '../../utils/formatters';

const OrderItems = ({items}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-6">
                {items?.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center space-x-4 border-b pb-6 last:border-b-0 last:pb-0"
                    >
                        <Link
                            to={`/product/${item.productId}`}
                            className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                        </Link>

                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/product/${item.productId}`}
                                className="text-sm font-medium text-gray-900 hover:text-primary-600"
                            >
                                {item.name}
                            </Link>
                            <p className="text-sm text-gray-500">{item.sku}</p>
                            <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {formatCurrency(item.price * item.quantity)}
                            </p>

                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default OrderItems; 