import React from 'react';
import {useSelector} from 'react-redux';
import ProductGrid from '../components/home/ProductGrid';
import HeroSection from '../components/home/HeroSection';
import CategoriesSection from '../components/home/CategoriesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import {testimonials} from '../data/data.js';
import categories from '../data/categories.json';
import {useState, useEffect} from 'react';
import productService from '../services/productService';

const Home = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const heroSlides = [
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1584093092919-3d551a9c5055?w=1920&auto=format&fit=crop&q=60',
            title: 'Discover Amazing Products',
            subtitle: 'Shop the latest trends and find great deals on quality products',
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1519060825752-c4832f2d400a?w=1920&auto=format&fit=crop&q=60',
            title: 'The best products for your home',
            subtitle: 'Explore our new arrivals and stay ahead of the latest trends',
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1674027392842-29f8354e236c?w=1920&auto=format&fit=crop&q=60',
            title: 'Changing behavior of the world',
            subtitle: 'We are changing the way the world works',
        },
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await productService.getMostPopularProducts();
            setPopularProducts(response);

            const response2 = await productService.getNewestProducts();
            setNewestProducts(response2);
        };
        fetchProducts();
    }, []);
    return (
        <div className="min-h-screen w-full">
            <HeroSection slides={heroSlides}/>
            <CategoriesSection categories={categories}/>
            <ProductGrid
                title="Popular Products"
                products={popularProducts}
            />
            <ProductGrid
                title="Newest Products"
                products={newestProducts}
            />
            <TestimonialsSection testimonials={testimonials}/>
        </div>
    );
};

export default Home;