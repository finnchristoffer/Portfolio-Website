import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import type { SocialLinks } from '@/types/portfolio';

interface HeaderProps {
    name: string;
    social?: SocialLinks;
}

const navLinks = [
    { href: '#achievements', label: 'Achievements' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
];

export function Header({ name, social }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuVariants = {
        closed: {
            x: '100%',
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
            },
        },
        open: {
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 400,
                damping: 40,
            },
        },
    };

    const linkVariants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.3,
            },
        }),
    };

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-stone-200 h-18"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <div className="container mx-auto px-6 h-full flex justify-between items-center">
                    <motion.a
                        href="#hero"
                        className="text-xl font-bold text-stone-800 tracking-wider"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {name ? name.split(' ')[0] : ''}
                    </motion.a>

                    <nav className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="text-base font-medium text-stone-600 hover:text-teal-600 transition-colors px-3 py-2 rounded-md"
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        <motion.a
                            href={social?.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-teal-600 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Github className="w-6 h-6" />
                        </motion.a>
                        <motion.a
                            href={social?.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-stone-500 hover:text-teal-600 transition-colors"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Linkedin className="w-6 h-6" />
                        </motion.a>
                    </div>

                    <motion.button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden text-stone-600 hover:text-teal-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Menu className="w-7 h-7" />
                    </motion.button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/20 z-40 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />
                        <motion.div
                            className="fixed inset-0 bg-white z-50 md:hidden"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <div className="container mx-auto px-6 h-full flex flex-col">
                                <div className="flex justify-between items-center h-18 border-b border-stone-200">
                                    <a
                                        href="#hero"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xl font-bold text-stone-800 tracking-wider"
                                    >
                                        {name ? name.split(' ')[0] : ''}
                                    </a>
                                    <motion.button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-stone-600 hover:text-teal-600"
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-8 h-8" />
                                    </motion.button>
                                </div>

                                <nav className="flex flex-col items-center justify-center flex-grow space-y-8">
                                    {navLinks.map((link, i) => (
                                        <motion.a
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-2xl font-medium text-stone-800 hover:text-teal-600 transition-colors"
                                            custom={i}
                                            variants={linkVariants}
                                            initial="closed"
                                            animate="open"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            {link.label}
                                        </motion.a>
                                    ))}
                                </nav>

                                <motion.div
                                    className="flex items-center justify-center space-x-6 pb-12"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <a
                                        href={social?.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-stone-500 hover:text-teal-600 transition-colors"
                                    >
                                        <Github className="w-8 h-8" />
                                    </a>
                                    <a
                                        href={social?.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-stone-500 hover:text-teal-600 transition-colors"
                                    >
                                        <Linkedin className="w-8 h-8" />
                                    </a>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
