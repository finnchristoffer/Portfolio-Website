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
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
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
                    {/* Animated timeline line */}
                    <motion.div
                        className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-stone-200 ml-4 md:ml-0 md:-translate-x-1/2"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                    />

                    {experience.map((job, index) => (
                        <motion.div
                            key={index}
                            className="relative pl-12 md:pl-0 mb-12"
                            variants={itemVariants}
                        >
                            <div
                                className="md:flex md:items-center"
                                style={{ flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}
                            >
                                <div className="md:w-1/2">
                                    <div
                                        className={`text-left ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                                            }`}
                                    >
                                        <motion.p
                                            className="text-teal-600 font-semibold"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            {job.duration}
                                        </motion.p>
                                        <h3 className="text-xl font-bold text-stone-800 mt-1">{job.role}</h3>
                                        <p className="text-stone-500">{job.company}</p>
                                    </div>
                                </div>

                                <div className="md:w-1/2 mt-4 md:mt-0">
                                    <motion.div
                                        className={`relative bg-white p-6 rounded-lg shadow-md border border-stone-200 ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'
                                            }`}
                                        whileHover={{
                                            y: -3,
                                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {/* Arrow pointer */}
                                        <div
                                            className={`hidden md:block absolute top-3 w-4 h-4 bg-white border-stone-200 transform ${index % 2 === 0
                                                    ? 'left-0 -translate-x-1/2 border-t-0 border-r-0 border-b-2 border-l-2 rotate-[45deg]'
                                                    : 'right-0 translate-x-1/2 border-b-0 border-l-0 border-t-2 border-r-2 rotate-[-315deg]'
                                                }`}
                                        />

                                        <p className="text-stone-600 mb-4">{job.description}</p>

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
                                </div>
                            </div>

                            {/* Timeline dot */}
                            <motion.div
                                className="absolute left-0 md:left-1/2 top-1 w-8 h-8 bg-white border-4 border-stone-50 rounded-full flex items-center justify-center ml-4 md:ml-0 -translate-x-1/2 z-10"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ type: 'spring', stiffness: 500, damping: 30, delay: 0.2 }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <Briefcase className="w-4 h-4 text-teal-600" />
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
