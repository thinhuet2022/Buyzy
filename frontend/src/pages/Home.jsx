import React from 'react';
import {useSelector} from 'react-redux';
import ProductGrid from '../components/home/ProductGrid';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import {featuredProducts, recommendedProducts} from '../data/products.js';
import {categories, testimonials} from '../data/data.js';

const Home = () => {
    const {isAuthenticated} = useSelector((state) => state.user);

    const heroSlides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&auto=format&fit=crop&q=60',
            title: 'Discover Amazing Products',
            subtitle: 'Shop the latest trends and find great deals on quality products',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&auto=format&fit=crop&q=60',
            title: 'Summer Collection 2024',
            subtitle: 'Explore our new arrivals and stay ahead of the fashion curve',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&auto=format&fit=crop&q=60',
            title: 'Limited Time Offers',
            subtitle: 'Don\'t miss out on our exclusive deals and discounts',
        },
    ];

    return (
        <div className="min-h-screen w-full">
            <HeroSection slides={heroSlides}/>
            <CategoriesSection categories={categories}/>
            <ProductGrid
                title="Recommended for You"
                subtitle="Based on your recent searches"
                products={recommendedProducts}
            />
            <ProductGrid
                title="Featured Products"
                products={featuredProducts}
            />
            <TestimonialsSection testimonials={testimonials}/>
        </div>
    );
};

export default Home;