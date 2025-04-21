import React from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const CategoryCard = ({category}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/category/${encodeURIComponent(category.name)}`);
    }

    return (
        <motion.div
            whileHover={{scale: 1.05}}
            onClick={handleClick}
            className="relative group cursor-pointer flex-shrink-0 w-40 text-left"
        >
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg relative">
                <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300 rounded-2xl"
                />
                <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-2xl"/>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                        {category.name}
                    </h3>
                </div>
            </div>
        </motion.div>
    );
};

export default CategoryCard; 