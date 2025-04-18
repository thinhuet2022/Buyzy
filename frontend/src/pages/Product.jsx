import React, {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import ProductGallery from '../components/product/ProductGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReviews';

const Product = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [product] = useState({
        id: id,
        name: 'Premium Wireless Headphones',
        brand: 'AudioTech',
        price: 299.99,
        originalPrice: 399.99,
        discount: 25,
        description: 'Experience crystal-clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
        features: [
            'Active Noise Cancellation',
            '30-hour battery life',
            'Bluetooth 5.0',
            'Built-in microphone',
            'Foldable design',
        ],
        variants: {
            color: ['#000000', '#FFFFFF', '#B22222', '#4169E1'],
            size: ['S', 'M', 'L', 'XL'],
            material: ['Leather', 'Synthetic', 'Mesh'],
            style: ['Over-Ear', 'On-Ear', 'In-Ear'],
            connectivity: ['Bluetooth', 'Wired', 'Both']
        },
        shop: {
            name: 'AudioTech Official Store',
            avatar: 'https://images.unsplash.com/photo-1567443024551-f3e3dee5f6b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8fDA%3D',
            rating: 4.8,
            reviews: 1250
        },
        images: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
        ],
    });

    const [reviews] = useState([
        {
            id: 1,
            user: {
                name: 'Sarah Johnson',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
            },
            rating: 5,
            date: '2 days ago',
            comment: 'Amazing sound quality and very comfortable to wear for long periods. The noise cancellation is impressive!',
        },
        {
            id: 2,
            user: {
                name: 'Michael Chen',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
            },
            rating: 4,
            date: '1 week ago',
            comment: 'Great headphones overall. Battery life is excellent, but the ear cushions could be more comfortable.',
        },
    ]);

    const handleAddToCart = (quantity) => {
        console.log('Adding to cart:', {product, quantity});
        // Here you would typically dispatch an action to add the item to the cart
        setTimeout(() => {
            navigate('/cart');
        }, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Main product section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:gap-12">
                        <div className="md:w-1/2">
                            <ProductGallery images={product.images}/>
                        </div>
                        <div className="md:w-1/2">
                            <ProductInfo product={product} onAddToCart={handleAddToCart}/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full width sections */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg  border-gray-200">
                {/* Shop section */}
                <div className="bg-white py-4 rounded-xl">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-4">
                            <img
                                src={product.shop.avatar}
                                alt={product.shop.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">{product.shop.name}</h2>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-lg font-medium text-gray-900">{product.shop.rating}</span>
                                    <span className="text-yellow-400 text-lg">★</span>
                                    <span
                                        className="text-gray-600">({product.shop.reviews.toLocaleString()} reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product details section */}
                <div className="bg-gray-50 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Description */}
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">Description</h2>
                                <p className="text-gray-700 leading-relaxed text-left">{product.description}</p>
                            </div>

                            {/* Features */}
                            <div className="bg-white p-8 rounded-xl shadow-sm">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-left">Key Features</h2>
                                <ul className="grid grid-cols-1 gap-4">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <span className="text-blue-500 text-xl">•</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews section */}
                <div className="bg-white py-12 rounded-xl mb-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ProductReviews
                            reviews={reviews}
                            averageRating={4.5}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product; 