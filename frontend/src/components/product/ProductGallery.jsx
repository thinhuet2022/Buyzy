import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';

const ProductGallery = ({images}) => {
    const [selectedImage, setSelectedImage] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                    src="https://via.placeholder.com/500"
                    alt="Product"
                    className="h-full w-full object-cover"
                />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedImage}
                        src={images[selectedImage].imageUrl}
                        alt="Product"
                        className="h-full w-full object-cover"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                    />
                </AnimatePresence>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square overflow-hidden rounded-lg ${
                                selectedImage === index ? 'ring-2 ring-primary-500' : ''
                            }`}
                        >
                            <img
                                src={image.imageUrl}
                                alt={`Thumbnail ${index + 1}`}
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery; 