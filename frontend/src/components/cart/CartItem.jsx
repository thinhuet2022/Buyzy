import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {formatCurrency} from '../../utils/formatters';

const CartItem = ({item, onUpdateQuantity, onRemove, isSelected, onSelect}) => {
    const handleQuantityChange = (value) => {
        const newQuantity = Math.max(1, Math.min(10, item.quantity + value));
        onUpdateQuantity(item.id, newQuantity);
    };

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -20}}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
        >
            <div className="flex items-center">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelect(item.id)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
            </div>

            <Link to={`/products/${item.productId}`} className="flex-shrink-0">
                <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-lg"
                />
            </Link>

            <div className="flex-1 min-w-0 ">
                <Link to={`/products/${item.productId}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 truncate text-left">
                        {item.productName}
                    </h3>
                    <p className="text-sm text-gray-500 truncate text-left">
                        {item.sku}
                    </p>
                </Link>
                <div className="mt-2 flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                        <button
                            onClick={() => handleQuantityChange(-1)}
                            className="p-2 text-gray-600 hover:bg-gray-50"
                        >
                            -
                        </button>
                        <span className="px-4 py-2">{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(1)}
                            className="p-2 text-gray-600 hover:bg-gray-50"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(item.id, item.productName)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-lg font-semibold text-primary-600">
                    {formatCurrency(item.price * item.quantity)}
                </p>
            </div>
        </motion.div>
    );
};

export default CartItem; 