import React from 'react';
import CategoryCard from './CategoryCard';

const CategoriesSection = ({categories, layout = 'horizontal'}) => {
    return (
        <section className="w-full py-7 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
                <div className="relative">
                    {layout === 'horizontal' ? (
                        // Horizontal layout with 2 rows
                        <div
                            className="grid grid-rows-2 grid-flow-col auto-cols-max gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {categories.map((category) => (
                                <CategoryCard key={category.id} category={category}/>
                            ))}
                            {/* Scroll Indicators */}
                            <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div
                                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                        </div>
                    ) : (
                        // Vertical layout with 2 columns
                        <div className="grid grid-cols-2 max-h-[100vh] gap-4 overflow-y-auto scrollbar-hide ">
                            {categories.map((category) => (
                                <CategoryCard key={category.id} category={category}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection; 