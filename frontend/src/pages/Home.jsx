import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const heroImages = [
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

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.5,
      reviews: 128,
      category: 'Electronics',
      sold: 128,
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 249.99,
      image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.8,
      reviews: 256,
      category: 'Electronics',
      sold: 256,
    },
    {
      id: 3,
      name: 'Gaming Laptop',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fHww',
      rating: 4.7,
      reviews: 89,
      category: 'Electronics',
      sold: 89,
    },
  ]);

  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Electronics',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D',
      count: 156,
    },
    {
      id: 2,
      name: 'Fashion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D',
      count: 243,
    },
    {
      id: 3,
      name: 'Home & Living',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww',
      count: 189,
    },
    {
      id: 4,
      name: 'Books',
      image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      count: 312,
    },
    {
      id: 5,
      name: 'Sports & Outdoors',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      count: 178,
    },
    {
      id: 6,
      name: 'Beauty & Health',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      count: 225,
    },
    {
      id: 7,
      name: 'Toys & Games',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      count: 143,
    },
    {
      id: 8,
      name: 'Automotive',
      image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      count: 98,
    }
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Enthusiast',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww',
      text: 'The quality of products and customer service is outstanding. I always find what I need!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Tech Reviewer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fHww',
      text: 'As a tech enthusiast, I appreciate the wide selection of electronics and competitive prices.',
      rating: 5,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${heroImages[currentSlide].image})`,
              }}
            >
              <div className="absolute  bg-black/40" />
            </div>
            <div className="relative w-full h-full flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white flex flex-col gap-2"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {heroImages[currentSlide].title}
                </h1>
                <p className="text-xl mb-8">
                  {heroImages[currentSlide].subtitle}
                </p>
                <Link to="/products">
                  <Button variant="white">Shop Now</Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
              {[
                ...categories,
                {
                  id: 9,
                  name: 'Books & Stationery',
                  image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 312,
                },
                {
                  id: 10,
                  name: 'Sports & Outdoors',
                  image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 178,
                },
                {
                  id: 11,
                  name: 'Beauty & Health',
                  image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 225,
                },
                {
                  id: 12,
                  name: 'Toys & Games',
                  image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 143,
                },
                {
                  id: 13,
                  name: 'Automotive',
                  image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 98,
                },
                {
                  id: 14,
                  name: 'Pet Supplies',
                  image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 167,
                },
                {
                  id: 15,
                  name: 'Jewelry',
                  image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 89,
                },
                {
                  id: 16,
                  name: 'Music & Instruments',
                  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                  count: 76,
                }
              ].map((category) => (
                <motion.div
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer flex-shrink-0 w-40"
                >
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-3">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">{category.count} products</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Scroll Indicators */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveCategory('all')}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm ${
                  activeCategory === 'electronics'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
                onClick={() => setActiveCategory('electronics')}
              >
                Electronics
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              ...featuredProducts,
              {
                id: 4,
                name: 'Wireless Earbuds',
                price: 129.99,
                image: 'https://images.unsplash.com/photo-1632200004922-bc18602c79fc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                rating: 4.6,
                reviews: 89,
                sold: 256,
                category: 'Electronics',
              },
              {
                id: 5,
                name: 'Smart Speaker',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.4,
                reviews: 67,
                sold: 189,
                category: 'Electronics',
              },
              {
                id: 6,
                name: 'Fitness Tracker',
                price: 79.99,
                image: 'https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                rating: 4.3,
                reviews: 112,
                sold: 312,
                category: 'Electronics',
              },
              {
                id: 7,
                name: 'Tablet',
                price: 299.99,
                image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.7,
                reviews: 45,
                sold: 78,
                category: 'Electronics',
              },
              {
                id: 8,
                name: 'Camera',
                price: 499.99,
                image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.8,
                reviews: 78,
                sold: 92,
                category: 'Electronics',
              },
              {
                id: 9,
                name: 'Gaming Mouse',
                price: 59.99,
                image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.5,
                reviews: 92,
                sold: 145,
                category: 'Electronics',
              },
              {
                id: 10,
                name: 'Mechanical Keyboard',
                price: 89.99,
                image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.6,
                reviews: 124,
                sold: 267,
                category: 'Electronics',
              },
              {
                id: 11,
                name: 'Portable Charger',
                price: 39.99,
                image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.2,
                reviews: 156,
                sold: 423,
                category: 'Electronics',
              },
              {
                id: 12,
                name: 'Bluetooth Headphones',
                price: 149.99,
                image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
                rating: 4.7,
                reviews: 89,
                sold: 198,
                category: 'Electronics',
              }
            ].map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <div className="p-3 flex flex-col flex-grow">
                  <h3 className="text-sm font-semibold line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-primary-600 font-bold text-sm">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-500">
                        {product.sold} sold
                      </span>
                    </div>
                    <button
                      className="p-1.5 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                      aria-label="Add to cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-24 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500 text-base">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-lg">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home; 