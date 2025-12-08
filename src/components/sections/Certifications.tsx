import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import type { Certification } from '@/types/portfolio';

interface CertificationsProps {
    certifications: Certification[];
}

export function Certifications({ certifications }: CertificationsProps) {
    const itemsPerPage = 3;
    const totalPages = Math.ceil(certifications.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0);

    const handlePageChange = (newPage: number) => {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
        setDirection(newPage > currentPage ? 1 : -1);
        setCurrentPage(newPage);
    };

    const currentItems = certifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 50 : -50,
            opacity: 0,
        }),
    };

    const renderCertification = (cert: Certification, index: number) => (
        <motion.div
            key={index}
            className="bg-white border border-stone-200 p-6 rounded-xl h-full group relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
                y: -5,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Top accent gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-400" />

            <div className="flex items-start space-x-4">
                {/* Always visible certification image */}
                <motion.div
                    className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden shadow-md border border-stone-100"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <ImageWithSkeleton
                        src={cert.imageUrl}
                        alt={cert.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                <div className="flex-grow">
                    <h3 className="font-bold text-stone-800 text-lg group-hover:text-teal-700 transition-colors">
                        {cert.name}
                    </h3>
                    <p className="text-stone-500 text-sm mt-0.5">
                        {cert.issuer}
                    </p>
                    <span className="inline-block bg-stone-100 text-stone-600 text-xs font-medium px-2 py-0.5 rounded-full mt-2">
                        {cert.year}
                    </span>
                    <motion.a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700 mt-3"
                        whileHover={{ x: 5 }}
                    >
                        Verify Credential <ArrowRight className="ml-1 w-4 h-4" />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );

    // Simple layout for less than 4 items
    if (certifications.length < 4) {
        let gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto';
        if (certifications.length === 1) {
            gridClasses = 'flex justify-center max-w-md mx-auto';
        }

        return (
            <section id="certifications" className="py-20 bg-white border-t border-stone-200">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-3xl font-bold text-center text-stone-800 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Certifications & Training
                    </motion.h2>
                    <div className="max-w-3xl mx-auto">
                        <div className={gridClasses}>
                            {certifications.map((cert, index) => renderCertification(cert, index))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // Paginated layout for 4+ items
    return (
        <section id="certifications" className="py-20 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl font-bold text-center text-stone-800 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Certifications & Training
                </motion.h2>

                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        <div className="overflow-hidden">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={currentPage}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: 'spring', stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                    }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                                >
                                    {currentItems.map((cert, index) => renderCertification(cert, index))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {totalPages > 1 && currentPage > 1 && (
                            <motion.button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-stone-100 transition-colors z-10"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft className="w-6 h-6 text-stone-700" />
                            </motion.button>
                        )}

                        {totalPages > 1 && currentPage < totalPages && (
                            <motion.button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-stone-100 transition-colors z-10"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight className="w-6 h-6 text-stone-700" />
                            </motion.button>
                        )}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12 space-x-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <motion.button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-3 h-3 rounded-full transition-colors ${currentPage === i + 1
                                        ? 'bg-teal-600'
                                        : 'bg-stone-300 hover:bg-stone-400'
                                        }`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
