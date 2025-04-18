import React from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const Wishlist = ({items}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <motion.div
                    key={item.id}
                    whileHover={{scale: 1.02}}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                    <div className="relative">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                        />
                        <button
                            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                            aria-label="Remove from wishlist"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4">
                        <Link
                            to={`/products/${item.id}`}
                            className="block"
                        >
                            <h3 className="font-medium text-gray-900 mb-1">
                                {item.name}
                            </h3>
                        </Link>
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-semibold text-primary-600">
                                ${item.price.toFixed(2)}
                            </p>
                            <button
                                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Wishlist; 