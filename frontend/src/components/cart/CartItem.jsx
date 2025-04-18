import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const CartItem = ({item, onUpdateQuantity, onRemove}) => {
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
            <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                />
            </Link>

            <div className="flex-1 min-w-0 ">
                <Link to={`/product/${item.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 truncate text-left">
                        {item.name}
                    </h3>
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
                        onClick={() => onRemove(item.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
                {/*{item.originalPrice && (*/}
                {/*    <p className="text-sm text-gray-500 line-through">*/}
                {/*        ${(item.originalPrice * item.quantity).toFixed(2)}*/}
                {/*    </p>*/}
                {/*)}*/}
            </div>
        </motion.div>
    );
};

export default CartItem; 