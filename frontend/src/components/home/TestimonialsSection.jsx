import React from 'react';
import TestimonialCard from './TestimonialCard.jsx';

const TestimonialsSection = ({testimonials}) => {
    return (
        <section className="w-full py-24 bg-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    What Our Customers Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection; 