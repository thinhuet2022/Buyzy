import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const CartSummary = ({subtotal, shipping, tax, total, onCheckout}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="bg-white rounded-lg shadow-sm p-6"
        >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">${shipping?.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax?.toFixed(2)}</span>
                </div>

                <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Total</span>
                        <span className="text-lg font-semibold text-gray-900">
              ${total?.toFixed(2)}
            </span>
                    </div>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                <button
                    onClick={onCheckout}
                    className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                    Proceed to Checkout
                </button>

                <Link
                    to="/"
                    className="block text-center text-primary-600 hover:text-primary-700 font-medium"
                >
                    Continue Shopping
                </Link>
            </div>
        </motion.div>
    );
};

export default CartSummary; 