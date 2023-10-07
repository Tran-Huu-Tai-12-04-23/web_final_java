import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const slideVariants = {
    hidden: {
        x: '100%', // Start position, off-screen to the right
    },
    visible: {
        x: 0, // End position, on-screen
        transition: {
            type: 'spring',
            duration: 1, // Adjust the duration as needed
        },
    },
    exit: {
        x: '-100%', // Exit position, off-screen to the left
        transition: {
            type: 'spring',
            duration: 1, // Adjust the duration as needed
        },
    },
};

function Slide({ slides = [] }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        // Auto-move to the next slide every 3 seconds (adjust the interval as needed)
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="slider-container ">
            {slides.map((slide, index) => (
                <motion.div
                    key={slide.id}
                    className={` ${index !== currentSlide && 'hidden'}`}
                    variants={slideVariants}
                    initial="hidden"
                    animate={index === currentSlide ? 'visible' : 'hidden'}
                    exit="exit"
                >
                    {slide.content}
                </motion.div>
            ))}
        </div>
    );
}

export default Slide;
