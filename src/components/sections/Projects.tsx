import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import { PaginatedSection } from '@/components/ui/PaginatedSection';
import { TiltCard } from '@/components/ui/TiltCard';
import type { Project } from '@/types/portfolio';

interface ProjectsProps {
    projects: Project[];
}

function ProjectCard(project: Project) {
    return (
        <TiltCard className="h-full" tiltAmount={8}>
            <motion.div
                className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm h-full flex flex-col group"
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
                            className="w-full h-48"
                        />
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-teal-600 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-stone-600 mb-4 flex-grow">{project.description}</p>

                    <div className="mb-4 flex flex-wrap">
                        {project.tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                className="inline-block bg-teal-50 text-teal-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full border border-teal-100"
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: '#ccfbf1',
                                    borderColor: '#99f6e4',
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
                            <Github className="w-5 h-5 mr-2" /> Source
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
    return (
        <PaginatedSection
            items={projects}
            renderItem={(project) => <ProjectCard {...project} />}
            sectionId="projects"
            title="Featured Projects"
            bgColor="bg-white"
        />
    );
}
