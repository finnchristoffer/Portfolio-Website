import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import type { SocialLinks } from '@/types/portfolio';

interface FooterProps {
    name: string;
    social?: SocialLinks;
}

export function Footer({ name, social }: FooterProps) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { name: 'GitHub', icon: Github, url: social?.github },
        { name: 'LinkedIn', icon: Linkedin, url: social?.linkedin },
        { name: 'Twitter', icon: Twitter, url: social?.twitter },
    ].filter(s => s.url);

    const navLinks = [
        { name: 'About', href: '#hero' },
        { name: 'Achievements', href: '#achievements' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 relative">
            {/* Back to top button - fixed bottom right */}
            <motion.button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-teal-600 hover:bg-teal-700 text-white p-3 rounded-full shadow-lg shadow-teal-600/30 transition-colors z-50"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <ArrowUp className="w-5 h-5" />
            </motion.button>

            <div className="container mx-auto px-6">
                {/* Navigation */}
                <motion.nav
                    className="flex flex-wrap justify-center gap-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {navLinks.map((link) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="text-stone-400 hover:text-white transition-colors text-sm font-medium"
                            whileHover={{ y: -2 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </motion.nav>

                {/* Social links */}
                {socialLinks.length > 0 && (
                    <motion.div
                        className="flex justify-center space-x-4 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {socialLinks.map((link) => (
                            <MagneticButton
                                key={link.name}
                                as="a"
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                magneticStrength={0.3}
                                className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-400 hover:text-white transition-all"
                            >
                                <link.icon className="w-5 h-5" />
                            </MagneticButton>
                        ))}
                    </motion.div>
                )}

                {/* Divider */}
                <div className="border-t border-stone-800 pt-8 mt-4" />

                {/* Bottom section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <motion.p
                        className="text-stone-500 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        © {new Date().getFullYear()} {name}. All Rights Reserved.
                    </motion.p>

                    <motion.p
                        className="text-stone-500 text-sm flex items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Built with <Heart className="w-3.5 h-3.5 mx-1 text-red-400" /> using React, TypeScript & Tailwind
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}

