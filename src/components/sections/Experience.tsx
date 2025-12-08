import { motion } from 'framer-motion';
import { Briefcase, CheckCircle } from 'lucide-react';
import type { Experience as ExperienceType } from '@/types/portfolio';

interface ExperienceProps {
    experience: ExperienceType[];
}

export function Experience({ experience }: ExperienceProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <section id="experience" className="py-20 bg-stone-50 border-t border-stone-200">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl font-bold text-center text-stone-800 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Work Experience
                </motion.h2>

                <motion.div
                    className="relative max-w-3xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {/* Timeline line */}
                    <motion.div
                        className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 to-stone-300"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                    />

                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            className="relative pl-16 pb-12 last:pb-0"
                            variants={itemVariants}
                        >
                            {/* Timeline icon */}
                            <motion.div
                                className={`absolute left-0 top-0 w-12 h-12 rounded-full flex items-center justify-center z-10 ${index === 0
                                        ? 'bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/30'
                                        : 'bg-white border-4 border-stone-200 shadow-sm'
                                    }`}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.1 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                {/* Pulse animation for current role */}
                                {index === 0 && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full bg-teal-500"
                                        animate={{
                                            scale: [1, 1.5],
                                            opacity: [0.4, 0],
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: 'easeOut',
                                        }}
                                    />
                                )}
                                <Briefcase className={`w-5 h-5 relative z-10 ${index === 0 ? 'text-white' : 'text-teal-600'}`} />
                            </motion.div>

                            {/* Card */}
                            <motion.div
                                className="bg-white rounded-xl p-6 shadow-md border border-stone-200 relative"
                                whileHover={{
                                    y: -4,
                                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
                                }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Connector line to icon */}
                                <div className="absolute left-0 top-5 -translate-x-full w-4 h-0.5 bg-stone-200" />

                                {/* Header */}
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-stone-800">{job.role}</h3>
                                        <p className="text-teal-600 font-medium">{job.company}</p>
                                    </div>
                                    <span className={`text-sm font-semibold px-3 py-1 rounded-full ${index === 0
                                            ? 'bg-teal-100 text-teal-700'
                                            : 'bg-stone-100 text-stone-600'
                                        }`}>
                                        {job.duration}
                                    </span>
                                </div>

                                {/* Description */}
                                <p className="text-stone-600 mb-4">{job.description}</p>

                                {/* Responsibilities */}
                                <ul className="space-y-2">
                                    {job.responsibilities.map((resp, i) => (
                                        <motion.li
                                            key={i}
                                            className="flex items-start"
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * i }}
                                        >
                                            <CheckCircle className="w-4 h-4 text-teal-500 mr-2 mt-1 flex-shrink-0" />
                                            <span className="text-stone-500 text-sm">{resp}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
