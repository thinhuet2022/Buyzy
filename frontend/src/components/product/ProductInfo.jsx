import React, {useCallback, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import Button from '../common/Button';
import classNames from 'classnames';

const VariantOption = React.memo(({
                                      option,
                                      isSelected,
                                      isColor,
                                      onClick
                                  }) => (
    <button
        onClick={onClick}
        className={classNames(
            'transition-all duration-200',
            isColor ? [
                'w-10 h-10 rounded-full border-2',
                isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:ring-2 hover:ring-gray-200'
            ] : [
                'px-4 py-2 rounded-lg border text-sm font-medium',
                isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            ]
        )}
        style={isColor ? {backgroundColor: option} : undefined}
        title={option}
    >
        {!isColor && option}
    </button>
));

const VariantSection = React.memo(({
                                       title,
                                       options,
                                       selectedValue,
                                       onChange,
                                       isColor
                                   }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium text-gray-900 capitalize">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-3">
            {options.map((option) => (
                <VariantOption
                    key={option}
                    option={option}
                    isSelected={selectedValue === option}
                    isColor={isColor}
                    onClick={() => onChange(title, option)}
                />
            ))}
        </div>
    </div>
));

const ProductInfo = ({product}) => {
    // State management
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState(() =>
        Object.entries(product.variants).reduce((acc, [key, options]) => ({
            ...acc,
            [key]: options[0]
        }), {})
    );

    // Memoized handlers
    const handleQuantityChange = useCallback((change) => {
        setQuantity(prev => Math.max(1, prev + change));
    }, []);

    const handleVariantChange = useCallback((variantType, value) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variantType]: value
        }));
    }, []);

    const handleAddToCart = useCallback(() => {
        console.log('Added to cart:', {
            ...product,
            quantity,
            selectedVariants
        });
    }, [product, quantity, selectedVariants]);

    const handleBuyNow = useCallback(() => {
        console.log('Buy now:', {
            ...product,
            quantity,
            selectedVariants
        });
    }, [product, quantity, selectedVariants]);

    // Price section component
    const PriceSection = useMemo(() => (
        <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
                <>
          <span className="text-lg text-gray-500 line-through">
            ${product.originalPrice}
          </span>
                    <span className="text-sm font-medium text-green-600">
            Save {product.discount}%
          </span>
                </>
            )}
        </div>
    ), [product.price, product.originalPrice, product.discount]);

    return (
        <div className="lg:col-span-2">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="space-y-8"
            >
                {/* Header Section */}
                <div className="space-y-4">
                    <h1 className="flex text-3xl font-bold text-gray-900">{product.name}</h1>
                    {PriceSection}
                </div>

                {/* Variants Section */}
                <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100">
                    {Object.entries(product.variants).map(([variantType, options]) => (
                        <VariantSection
                            key={variantType}
                            title={variantType}
                            options={options}
                            selectedValue={selectedVariants[variantType]}
                            onChange={handleVariantChange}
                            isColor={variantType.toLowerCase().includes('color')}
                        />
                    ))}

                    {/* Actions Section */}
                    <div className="space-y-6 border-t border-gray-200 pt-6">
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700 font-medium">Quantity</span>
                            <div className="flex items-center border border-gray-200 rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-l-lg"
                                >
                                    −
                                </button>
                                <span className="px-6 py-2 text-gray-900 font-medium border-x border-gray-200">
                  {quantity}
                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-r-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Button
                                variant="primary"
                                className="flex-1 py-3 text-base"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="secondary"
                                className="flex-1 py-3 text-base"
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default React.memo(ProductInfo);