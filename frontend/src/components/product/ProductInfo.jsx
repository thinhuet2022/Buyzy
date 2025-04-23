import React, {useCallback, useMemo, useState} from 'react';
import {motion} from 'framer-motion';
import Button from '../common/Button';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import authService from '../../services/authService';

const VariantOption = ({option, isSelected, onClick, isColor}) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg border-2 transition-colors ${
            isSelected
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300'
        } ${isColor ? 'w-18 h-12 rounded-full' : ''}`}
        style={isColor ? {backgroundColor: option} : {}}
    >
        {option}
    </button>
);

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

const ProductInfo = ({product, onAddToCart}) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const hasToken = !!authService.getCurrentUser();
    
    // State management
    const [quantity, setQuantity] = useState(1);
    const [selectedVariants, setSelectedVariants] = useState({});

    // Extract available variant options from product variants
    const variantOptions = useMemo(() => {
        const options = {};
        if (product.variant) {
            product.variant.forEach(variant => {
                variant.variantOptions.forEach(option => {
                    if (!options[option.optionName]) {
                        options[option.optionName] = new Set();
                    }
                    options[option.optionName].add(option.optionValue);
                });
            });
        }
        // Convert Sets to Arrays
        return Object.entries(options).reduce((acc, [key, value]) => {
            acc[key] = Array.from(value);
            return acc;
        }, {});
    }, [product.variant]);

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
        // Debug logging
        console.log('Selected variants:', selectedVariants);
        console.log('Product variants:', product.variant);
        
        // Find the matching variant based on selected options
        const selectedVariant = product.variant.find(variant => {
            console.log('Checking variant:', variant);
            const matches = variant.variantOptions.every(option => {
                const matches = selectedVariants[option.optionName] === option.optionValue;
                console.log(`Checking option ${option.optionName}: ${option.optionValue} against selected: ${selectedVariants[option.optionName]}, matches: ${matches}`);
                return matches;
            });
            console.log('Variant matches:', matches);
            return matches;
        });

        if (selectedVariant) {
            onAddToCart(quantity, selectedVariant);
        } else {
            // Handle case where no variant is selected
            alert('Please select all variant options');
        }
    }, [product.variant, selectedVariants, quantity, onAddToCart]);

    const handleBuyNow = useCallback(() => {
        if (!isAuthenticated && !hasToken) {
            toast.error('Please login to proceed with checkout');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            return;
        }

        // Find the matching variant based on selected options
        const selectedVariant = product.variant.find(variant => {
            return variant.variantOptions.every(option => 
                selectedVariants[option.optionName] === option.optionValue
            );
        });

        if (!selectedVariant) {
            toast.error('Please select all variant options');
            return;
        }

        // Create a checkout item object
        const checkoutItem = {
            productId: product.productId,
            quantity: quantity,
            cartItemId: selectedVariant.id,
            productName: product.name,
            productImage: product.imageUrls[0]?.imageUrl || 'https://via.placeholder.com/500',
            productPrice: product.price,
            sku: selectedVariant.variantOptions.map(option => option.optionValue).join('-')
        };

        // Navigate directly to checkout with the item
        navigate('/checkout', { 
            state: { 
                selectedItems: [checkoutItem],
                isDirectCheckout: true 
            } 
        });
    }, [product, quantity, selectedVariants, navigate, isAuthenticated, hasToken]);

    // Price section component
    const PriceSection = useMemo(() => (
        <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            
        </div>
    ), [product.price]);

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
                    {Object.entries(variantOptions).map(([variantType, options]) => (
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