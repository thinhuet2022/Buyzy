import React from 'react';
import {motion} from 'framer-motion';

const TestimonialCard = ({testimonial}) => {
    return (
        <motion.div
            whileHover={{scale: 1.02}}
            className="bg-white rounded-lg shadow-lg p-8"
        >
            <div className="flex items-center mb-6">
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-base">{testimonial.role}</p>
                </div>
            </div>
            <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-6 h-6 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                ))}
            </div>
            <p className="text-gray-600 text-lg">{testimonial.text}</p>
        </motion.div>
    );
};

export default TestimonialCard; 