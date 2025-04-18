import React from 'react';
import {motion} from 'framer-motion';

const CategoryCard = ({category}) => {
    return (
        <motion.div
            whileHover={{scale: 1.05}}
            className="relative group cursor-pointer flex-shrink-0 w-40"
        >
            <div className="aspect-square overflow-hidden rounded-lg">
                <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
                <div className="absolute bottom-0 left-0 p-3">
                    <h3 className="text-lg font-semibold text-white mb-1">
                        {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">{category.count} products</p>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard; 