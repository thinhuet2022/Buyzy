import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReviews';
import productService from '../services/productService';
import cartService from '../services/cartService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import authService from '../services/authService';

const Product = () => {
    const navigate = useNavigate();
    const {productId} = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const hasToken = !!authService.getCurrentUser();

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await productService.getProductById(productId);
            console.log('Product response:', response);
            if (response) {
                setProduct(response);
                setReviews(response.reviews || []);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to load product. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleAddToCart = async (quantity, selectedVariant) => {
        if(isAuthenticated || hasToken) {
        console.log('Adding to cart:', {productId, quantity, selectedVariant});
        const sku = selectedVariant.variantOptions.map(option => option.optionValue).join('-');
        const response = await cartService.addToCart(productId, quantity, selectedVariant.id, sku);
            if (response) {
                toast.success('Product added to cart successfully');
            } else {
                toast.error('Failed to add product to cart');
            }
        } else {
            toast.error('Please login to add product to cart');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-red-500 text-lg">{error}</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-500 text-lg">Product not found</div>
            </div>
        );
    }

    // Transform variant data into a more usable format
    const variants = product.variant.reduce((acc, variant) => {
        variant.variantOptions.forEach(option => {
            if (!acc[option.optionName]) {
                acc[option.optionName] = new Set();
            }
            acc[option.optionName].add(option.optionValue);
        });
        return acc;
    }, {});

    // Convert Sets to Arrays
    const variantOptions = Object.entries(variants).reduce((acc, [key, value]) => {
        acc[key] = Array.from(value);
        return acc;
    }, {});

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main product section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:gap-12">
                        <div className="md:w-1/2">
                            <ProductGallery images={product.imageUrls.length > 0 ? product.imageUrls : [{imageUrl: 'https://via.placeholder.com/500'}]}/>
                        </div>
                        <div className="md:w-1/2">
                            <ProductInfo 
                                product={product} 
                                onAddToCart={handleAddToCart}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Product details section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg border-gray-200">
                <div className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Description */}
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">Description</h2>
                                <p className="text-gray-700 leading-relaxed text-left">{product.description}</p>
                            </div>

                            {/* Product Info */}
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">Product Information</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Brand:</span>
                                        <span className="text-gray-900">{product.brand}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="text-gray-900">{product.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Stock:</span>
                                        <span className="text-gray-900">{product.stock}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Sold:</span>
                                        <span className="text-gray-900">{product.soldQuantity}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews section */}
                <div className="bg-white py-12 rounded-xl mb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ProductReviews
                            reviews={product.reviews}
                            averageRating={0} // Since there are no reviews yet
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product; 