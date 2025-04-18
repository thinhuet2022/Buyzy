import React from 'react';
import {motion} from 'framer-motion';

const ProductCard = ({product}) => {
    return (
        <motion.div
            whileHover={{y: -5}}
            className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
        >
            <div className="relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-3 flex flex-col flex-grow">
                <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                    {product.name}
                </h3>
                <div className="flex items-center mb-2">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-3 h-3 ${
                                    i < Math.floor(product.rating)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">
            ({product.reviews})
          </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <div className="flex flex-col">
            <span className="text-primary-600 font-bold text-sm">
              ${product.price}
            </span>
                        <span className="text-xs text-gray-500">
              {product.sold} sold
            </span>
                    </div>
                    <button
                        className="p-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                        aria-label="Add to cart"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard; 