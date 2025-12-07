import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    className?: string;
}

const imagePaths: Record<string, string> = {
    avatarProfile: '/assets/image.png',
    projectJdSport: '/assets/banner_jdsport.jpg',
    projectEraspace: '/assets/banner_eraspace.png',
    projectDBank: '/assets/banner_dbankpro.png',
};

export function ImageWithSkeleton({ src, alt, className = '' }: ImageWithSkeletonProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    // Look up the src identifier in the imagePaths registry
    const imageUrl = imagePaths[src] || src;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <motion.img
                src={imageUrl}
                alt={alt}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.1,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                onLoad={() => setIsLoaded(true)}
                onError={() => {
                    setIsLoaded(true);
                    setHasError(true);
                }}
            />
            <AnimatePresence>
                {!isLoaded && !hasError && (
                    <motion.div
                        className="skeleton absolute inset-0 w-full h-full"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
