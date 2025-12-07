import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { ImageWithSkeleton } from '@/components/ui/ImageWithSkeleton';
import { AnimatedCharacters } from '@/components/ui/AnimatedText';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SwiftIcon, FlutterIcon } from '@/components/icons/BrandIcons';
import type { Skill } from '@/types/portfolio';
import * as LucideIcons from 'lucide-react';

interface HeroProps {
    name: string;
    title: string;
    bio: string;
    email: string;
    skills: Skill[];
    avatarUrl: string;
}

// Dynamic icon component
function DynamicIcon({ name, className }: { name: string; className?: string }) {
    // Handle brand icons that aren't in Lucide
    if (name === 'Swift') {
        return <SwiftIcon className={className} />;
    }
    if (name === 'Flutter') {
        return <FlutterIcon className={className} />;
    }

    const iconMap: Record<string, keyof typeof LucideIcons> = {
        Apple: 'Apple',
        React: 'Atom',
        Server: 'Server',
    };

    const iconName = iconMap[name] || 'Circle';
    const IconComponent = LucideIcons[iconName] as React.ComponentType<{ className?: string }>;

    if (!IconComponent) return null;

    return <IconComponent className={className} />;
}

export function Hero({ name, title, bio, email, skills, avatarUrl }: HeroProps) {
    const containerRef = useRef<HTMLElement>(null);

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const avatarY = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                delay: 0.8 + i * 0.1,
                duration: 0.3,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <section
            ref={containerRef}
            id="hero"
            className="min-h-screen flex items-center bg-white text-stone-800 -mt-[72px] relative overflow-hidden"
        >
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-stone-50/50 to-teal-50/30" />

            <motion.div className="container mx-auto px-6 relative z-10" style={{ opacity }}>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
                    <motion.div
                        className="md:w-3/5 text-center md:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        style={{ y: textY }}
                    >
                        <motion.h1
                            className="text-4xl md:text-6xl font-extrabold leading-tight mb-4"
                            variants={itemVariants}
                        >
                            <span className="text-stone-500 block">
                                <AnimatedCharacters text={`Hi, I'm ${name}.`} delay={0.2} />
                            </span>
                            <span className="block mt-2">
                                <AnimatedCharacters text={`A ${title}.`} delay={0.6} />
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-stone-600 mb-8 max-w-2xl mx-auto md:mx-0"
                            variants={itemVariants}
                        >
                            {bio}
                        </motion.p>

                        <motion.div className="mb-10" variants={itemVariants}>
                            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                                Core Technologies
                            </h3>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="flex items-center bg-stone-100/80 backdrop-blur-sm py-2 px-4 rounded-full cursor-default border border-stone-200/50"
                                        custom={index}
                                        variants={skillVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover={{
                                            scale: 1.08,
                                            y: -4,
                                            backgroundColor: 'rgba(245, 245, 244, 1)',
                                            boxShadow: '0 10px 20px -10px rgba(0,0,0,0.15)',
                                            transition: { duration: 0.2 },
                                        }}
                                    >
                                        <div className="text-teal-600 mr-2.5">
                                            <DynamicIcon name={skill.icon} className="w-5 h-5" />
                                        </div>
                                        <span className="text-stone-700 font-medium text-sm">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
                            variants={itemVariants}
                        >
                            <MagneticButton
                                as="a"
                                href="#projects"
                                magneticStrength={0.2}
                                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-all flex items-center justify-center shadow-lg shadow-teal-600/25 hover:shadow-xl hover:shadow-teal-600/30"
                            >
                                View My Work <ArrowRight className="ml-2 w-5 h-5" />
                            </MagneticButton>

                            <MagneticButton
                                as="a"
                                href={`mailto:${email}`}
                                magneticStrength={0.2}
                                className="bg-white hover:bg-stone-50 text-stone-700 font-bold py-3 px-6 rounded-lg text-center transition-all border border-stone-300 flex items-center justify-center shadow-sm hover:shadow-md"
                            >
                                Get In Touch <Mail className="ml-2 w-5 h-5" />
                            </MagneticButton>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="md:w-2/5"
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        style={{ y: avatarY }}
                    >
                        <motion.div
                            className="relative w-64 h-64 md:w-80 md:h-80 mx-auto"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Glow effect behind avatar */}
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full blur-2xl scale-110" />

                            <div className="relative rounded-full shadow-2xl border-4 border-white overflow-hidden">
                                <ImageWithSkeleton
                                    src={avatarUrl}
                                    alt={name}
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Decorative ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-teal-400/30"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                style={{ scale: 1.15 }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
