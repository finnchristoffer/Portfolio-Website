import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
    projects: Project[];
}

function FeaturedProjectCard({ project }: { project: Project }) {
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Parallax spring physics
    const springConfig = { stiffness: 150, damping: 20 };
    const parallaxX = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);
    const parallaxY = useSpring(useTransform(mouseY, [0, 1], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
    };



    // Floating particles data
    const particles = [
        { size: 4, x: '15%', y: '20%', delay: 0 },
        { size: 6, x: '80%', y: '25%', delay: 0.5 },
        { size: 3, x: '70%', y: '60%', delay: 1 },
        { size: 5, x: '25%', y: '70%', delay: 1.5 },
        { size: 4, x: '90%', y: '80%', delay: 2 },
    ];

    return (
        <TiltCard className="h-full" tiltAmount={2}>
            <motion.div
                ref={containerRef}
                className="relative bg-stone-900 rounded-2xl overflow-hidden shadow-2xl min-h-[550px] cursor-pointer animated-gradient-border"
                onMouseMove={handleMouseMove}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={handleMouseLeave}
                whileHover={{
                    boxShadow: '0 50px 100px -30px rgba(20, 184, 166, 0.3)',
                }}
                transition={{ duration: 0.5 }}
            >
                {/* Parallax banner image */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        x: parallaxX,
                        y: parallaxY,
                        scale: isHovered ? 1.1 : 1.02,
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <ImageWithSkeleton
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Gradient overlay - enhanced with more depth */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20"
                    animate={{ opacity: isHovered ? 1 : 0.75 }}
                    transition={{ duration: 0.4 }}
                />

                {/* Floating particles - visible on hover */}
                <AnimatePresence>
                    {isHovered && particles.map((particle, index) => (
                        <motion.div
                            key={index}
                            className="absolute rounded-full bg-teal-400/60"
                            style={{
                                width: particle.size,
                                height: particle.size,
                                left: particle.x,
                                top: particle.y,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8],
                                y: [0, -15, 0],
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: particle.delay,
                                ease: 'easeInOut',
                            }}
                        />
                    ))}
                </AnimatePresence>

                {/* Featured badge with pulse animation */}
                <motion.div
                    className="absolute top-5 left-5 z-20 flex items-center gap-1.5 bg-gradient-to-r from-teal-500 to-teal-400 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg"
                    animate={{
                        boxShadow: isHovered
                            ? ['0 0 0 0 rgba(20, 184, 166, 0.4)', '0 0 20px 8px rgba(20, 184, 166, 0.2)', '0 0 0 0 rgba(20, 184, 166, 0.4)']
                            : '0 4px 15px -3px rgba(20, 184, 166, 0.3)',
                    }}
                    transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                >
                    <motion.div
                        animate={{ rotate: isHovered ? 360 : 0 }}
                        transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                    </motion.div>
                    Featured Project
                </motion.div>

                {/* Content container - positioned at bottom with flex to push content down */}
                <div className="absolute inset-0 p-8 md:p-10 z-10 flex flex-col justify-end">
                    {/* Details that appear on hover - positioned above title */}
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 10,
                        }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
                        className="mb-4"
                    >
                        {/* Description */}
                        <motion.p
                            className="text-white/90 mb-6 text-base md:text-lg leading-relaxed max-w-2xl"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                        >
                            {project.description}
                        </motion.p>

                        {/* Tags with glass morphism */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, i) => (
                                <motion.span
                                    key={i}
                                    className="glass-morphism text-white text-sm px-4 py-1.5 rounded-full"
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glow-button flex items-center glass-morphism hover:bg-white/20 text-white px-6 py-3 rounded-xl transition-all font-medium"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Github className="w-5 h-5 mr-2" />
                                </motion.div>
                                View Source
                            </motion.a>
                            <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glow-button flex items-center bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 text-white px-6 py-3 rounded-xl transition-all font-medium shadow-lg shadow-teal-500/25"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ExternalLink className="w-5 h-5 mr-2" />
                                </motion.div>
                                Live Demo
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Title and hint wrapper - always at the very bottom left */}
                    <div className="flex flex-col items-start">
                        {/* Title with gradient on hover */}
                        <motion.h3
                            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                            style={{
                                textShadow: '0 4px 30px rgba(0,0,0,0.8)',
                            }}
                            animate={{
                                background: isHovered
                                    ? 'linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #14b8a6 100%)'
                                    : 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            {project.title}
                        </motion.h3>

                        {/* Hover hint - directly below title, fades out on hover */}
                        <motion.p
                            className="text-white/80 text-base font-medium flex items-center gap-3"
                            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
                            animate={{
                                opacity: isHovered ? 0 : 1,
                                y: isHovered ? -5 : 0,
                                height: isHovered ? 0 : 'auto',
                            }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            <motion.span
                                className="inline-block w-8 h-0.5 bg-gradient-to-r from-teal-400 to-teal-300 rounded-full"
                                animate={{ scaleX: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            Hover to explore
                        </motion.p>
                    </div>

                </div>

                {/* Corner accent with enhanced glow */}
                <motion.div
                    className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-400/30 via-teal-500/10 to-transparent pointer-events-none"
                    animate={{
                        opacity: isHovered ? 1 : 0.4,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                />

                {/* Bottom accent line */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                        scaleX: isHovered ? 1 : 0,
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.5 }}
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
                    <p className="text-stone-600 mb-4 flex-grow line-clamp-5">{project.description}</p>

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

