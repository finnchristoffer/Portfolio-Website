import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, CheckCircle, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Achievement } from '@/types/portfolio';

interface AchievementsProps {
    achievements: Achievement[];
}

// Map icon names to Lucide components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Award,
    CheckCircle,
    Star,
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
    const IconComponent = iconMap[name] || Award;
    return <IconComponent className={className} />;
}

export function Achievements({ achievements }: AchievementsProps) {
    const itemsPerPage = 3;
    const totalPages = Math.ceil(achievements.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0);

    const handlePageChange = (newPage: number) => {
        if (newPage === currentPage || newPage < 1 || newPage > totalPages) return;
        setDirection(newPage > currentPage ? 1 : -1);
        setCurrentPage(newPage);
    };

    const currentItems = achievements.slice(
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

    const renderAchievement = (ach: Achievement, index: number) => (
        <TiltCard key={index} className="h-full" tiltAmount={6}>
            <motion.div
                className="bg-white border border-stone-200 p-6 rounded-lg h-full group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.12)',
                }}
            >
                {/* Subtle gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-start space-x-4">
                    <motion.div
                        className="flex-shrink-0 text-teal-600 mt-1 p-2 bg-teal-50 rounded-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                        <DynamicIcon name={ach.icon} className="w-6 h-6" />
                    </motion.div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-stone-800 group-hover:text-teal-700 transition-colors">
                            {ach.title}
                        </h3>
                        <p className="text-stone-600 text-sm mt-1">{ach.description}</p>
                        <motion.a
                            href={ach.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-700 mt-3"
                            whileHover={{ x: 5 }}
                        >
                            View Proof <ArrowRight className="ml-1 w-4 h-4" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </TiltCard>
    );

    // Simple layout for less than 4 items
    if (achievements.length < 4) {
        let gridClasses = 'grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto';
        if (achievements.length === 1) {
            gridClasses = 'flex justify-center max-w-md mx-auto';
        } else if (achievements.length === 2) {
            gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto';
        }

        return (
            <section id="achievements" className="py-20 bg-gradient-to-b from-stone-50 to-white border-t border-stone-200">
                <div className="container mx-auto px-6">
                    <motion.h2
                        className="text-3xl font-bold text-center text-stone-800 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Key Achievements
                    </motion.h2>
                    <div className={gridClasses}>
                        {achievements.map((ach, index) => renderAchievement(ach, index))}
                    </div>
                </div>
            </section>
        );
    }

    // Paginated layout for 4+ items
    return (
        <section id="achievements" className="py-20 bg-gradient-to-b from-stone-50 to-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl font-bold text-center text-stone-800 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Key Achievements
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
                                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                            >
                                {currentItems.map((ach, index) => renderAchievement(ach, index))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {totalPages > 1 && currentPage > 1 && (
                        <motion.button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="absolute top-1/2 -left-4 md:-left-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-stone-50 transition-colors z-10 border border-stone-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft className="w-6 h-6 text-stone-700" />
                        </motion.button>
                    )}

                    {totalPages > 1 && currentPage < totalPages && (
                        <motion.button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="absolute top-1/2 -right-4 md:-right-16 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-stone-50 transition-colors z-10 border border-stone-200"
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
        </section>
    );
}
