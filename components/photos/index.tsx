import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the type for image props
interface Photo {
    src: string;
    alt: string;
}

// Define props for the gallery component
interface PhotoGalleryProps {
    photos: Photo[];
    autoPlayInterval?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
    photos,
    autoPlayInterval = 5000
}) => {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPhotoIndex((prevIndex) =>
                (prevIndex + 1) % photos.length
            );
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [photos, autoPlayInterval]);

    // Transition variants for smooth animations
    const variants = {
        enter: { opacity: 0, scale: 0.9 },
        center: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeInOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 1.1,
            transition: {
                duration: 0.7,
                ease: "easeInOut"
            }
        }
    };

    // Navigation handlers
    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            (prevIndex + 1) % photos.length
        );
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) =>
            prevIndex === 0 ? photos.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full h-[70vh] overflow-hidden">
            {/* Photo Container */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPhotoIndex}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={variants}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={photos[currentPhotoIndex].src}
                        alt={photos[currentPhotoIndex].alt}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 
        bg-white/30 backdrop-blur-sm rounded-full p-2 
        hover:bg-white/50 transition-all"
            >
                ←
            </button>
            <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10
        bg-white/30 backdrop-blur-sm rounded-full p-2 
        hover:bg-white/50 transition-all"
            >
                →
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`
              w-3 h-3 rounded-full transition-all
              ${index === currentPhotoIndex
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'}
            `}
                    />
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;