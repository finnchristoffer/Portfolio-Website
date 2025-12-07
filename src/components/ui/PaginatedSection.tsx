import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedSectionProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => ReactNode;
    sectionId: string;
    title: string;
    itemsPerPage?: number;
    bgColor?: string;
    gridCols?: string;
}

export function PaginatedSection<T>({
    items,
    renderItem,
    sectionId,
    title,
    itemsPerPage = 3,
    bgColor = 'bg-white',
    gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: PaginatedSectionProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
        setDirection(newPage > currentPage ? 1 : -1);
        setCurrentPage(newPage);
    };

    const currentItems = items.slice(
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

    return (
        <section id={sectionId} className={`py-20 ${bgColor} border-t border-stone-200`}>
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl font-bold text-center text-stone-800 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>

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
                                className={`grid ${gridCols} gap-8`}
                            >
                                {currentItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {renderItem(item, index)}
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
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

                {/* Pagination Dots */}
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
        </section>
    );
}
