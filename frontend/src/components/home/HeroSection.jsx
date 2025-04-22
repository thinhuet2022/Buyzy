import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Link} from 'react-router-dom';

const HeroSection = ({slides}) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="relative w-full h-[560px] overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{x: "100%"}}
                    animate={{x: 0}}
                    exit={{x: "-100%"}}
                    transition={{duration: 0.5, ease: "easeInOut"}}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${slides[currentSlide].image})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/40"/>
                    </div>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            initial={{opacity: 0, x: 20}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                            className="text-white flex flex-col gap-2"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                {slides[currentSlide].title}
                            </h1>
                            <p className="text-xl mb-8">
                                {slides[currentSlide].subtitle}
                            </p>
                            <Link to="/products">
                                <button
                                    className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                                    Shop Now
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Slide Indicators
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div> */}
        </section>
    );
};

export default HeroSection;