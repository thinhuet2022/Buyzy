import React from 'react';
import {Link} from 'react-router-dom';
import ProductCard from './ProductCard.jsx';

const ProductGrid = ({title, subtitle, products, showViewAll = true}) => {
    return (
        <section className="w-full py-12 bg-gray-100">
            <div className="w-full max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold">{title}</h2>
                        {subtitle && (
                            <p className="text-gray-500 mt-1">{subtitle}</p>
                        )}
                    </div>
                    {showViewAll && (
                        <Link to="/products" className="text-primary-600 hover:text-primary-700 font-medium">
                            View All
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.productId} product={product}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid; 