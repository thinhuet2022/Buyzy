import React from 'react';
import {motion} from 'framer-motion';

const ProductReviews = ({reviews, averageRating}) => {
    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <svg
                key={index}
                className={`w-5 h-5 ${
                    index < rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
        ));
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    {renderStars(averageRating)}
                    <span className="ml-2 text-gray-600">({reviews.length} reviews)</span>
                </div>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="bg-white rounded-lg shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <p className="font-medium text-gray-900">{review.user.name}</p>
                                    <p className="text-sm text-gray-500">{review.date}</p>
                                </div>
                            </div>
                            <div className="flex">{renderStars(review.rating)}</div>
                        </div>
                        <p className="text-left text-gray-600">{review.comment}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductReviews; 