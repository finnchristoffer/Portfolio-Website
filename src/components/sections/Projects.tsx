import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
    projects: Project[];
}

function FeaturedProjectCard({ project }: { project: Project }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <TiltCard className="h-full" tiltAmount={3}>
            <motion.div
                className="relative bg-stone-900 rounded-2xl overflow-hidden shadow-2xl min-h-[500px] cursor-pointer"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{
                    boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.4)',
                }}
                transition={{ duration: 0.4 }}
            >
                {/* Full banner image */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <ImageWithSkeleton
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient overlay - always visible, intensifies on hover */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                    animate={{ opacity: isHovered ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Featured badge - always visible */}
                <div className="absolute top-4 left-4 z-20 flex items-center bg-teal-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 mr-1" />
                    Featured Project
                </div>

                {/* Content container - positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                    {/* Title - always visible */}
                    <motion.h3
                        className="text-3xl md:text-4xl font-bold mb-3"
                        style={{
                            textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                            color: isHovered ? '#5eead4' : '#ffffff'
                        }}
                    >
                        {project.title}
                    </motion.h3>

                    {/* Content area with smooth crossfade */}
                    <AnimatePresence mode="wait">
                        {!isHovered ? (
                            <motion.p
                                key="hint"
                                className="text-white/80 text-base font-medium flex items-center gap-2"
                                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <span className="inline-block w-5 h-0.5 bg-teal-400 rounded-full"></span>
                                Hover to view details
                            </motion.p>
                        ) : (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Description */}
                                <p
                                    className="text-white/90 mb-5 text-base leading-relaxed"
                                    style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}
                                >
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6 max-h-24 overflow-y-auto">
                                    {project.tags.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="bg-white/10 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full border border-white/20"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-5 py-2.5 rounded-lg transition-all border border-white/20 hover:scale-105"
                                    >
                                        <Github className="w-5 h-5 mr-2" />
                                        Source
                                    </a>
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center bg-teal-600 hover:bg-teal-500 text-white px-5 py-2.5 rounded-lg transition-all hover:scale-105"
                                    >
                                        <ExternalLink className="w-5 h-5 mr-2" />
                                        Live Demo
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Corner accent */}
                <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-teal-500/20 to-transparent"
                    animate={{ opacity: isHovered ? 0.8 : 0.3 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </TiltCard>
    );
}



function ProjectCard({ project }: { project: Project }) {
    return (
        <TiltCard className="h-full" tiltAmount={8}>
            <motion.div
                className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm h-full flex flex-col group"
                whileHover={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="overflow-hidden relative">
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        <ImageWithSkeleton
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-56"
                        />
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-teal-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-stone-600 mb-4 flex-grow line-clamp-3">{project.description}</p>

                    <div className="mb-4 flex flex-wrap">
                        {project.tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                className="inline-block bg-teal-50 text-teal-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full border border-teal-100"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: '#ccfbf1',
                                }}
                                transition={{ duration: 0.15 }}
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-stone-200 flex justify-between items-center">
                        <motion.a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-teal-600 transition-colors flex items-center z-10"
                            whileHover={{ x: 3, scale: 1.02 }}
                        >
                            <Github className="w-5 h-5 mr-2" />
                            Source
                        </motion.a>
                        <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-teal-600 transition-colors flex items-center z-10"
                            whileHover={{ x: 3, scale: 1.02 }}
                        >
                            Live Demo <ArrowRight className="w-5 h-5 ml-2" />
                        </motion.a>
                    </div>
                </div>
            </motion.div>
        </TiltCard>
    );
}

export function Projects({ projects }: ProjectsProps) {
    if (projects.length === 0) return null;

    const featuredProject = projects[0];
    const otherProjects = projects.slice(1);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
        <section id="projects" className="py-20 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl font-bold text-center text-stone-800 mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    Featured Projects
                </motion.h2>
                <motion.p
                    className="text-stone-500 text-center mb-12 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    A selection of projects I&apos;ve worked on, showcasing my skills in mobile and web development.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {/* Featured project */}
                    <motion.div className="mb-8" variants={itemVariants}>
                        <FeaturedProjectCard project={featuredProject} />
                    </motion.div>

                    {/* Other projects */}
                    {otherProjects.length > 0 && (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                        >
                            {otherProjects.map((project, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}

