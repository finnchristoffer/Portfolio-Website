import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ContactProps {
    email: string;
}

export function Contact({ email }: ContactProps) {
    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-stone-50 to-stone-100 text-center border-t border-stone-200 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-teal-100/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-50/40 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold text-center text-stone-800 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Let's Connect
                    </motion.h2>

                    <motion.p
                        className="text-stone-600 mb-10 max-w-xl mx-auto text-lg"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        I'm currently open to new opportunities and collaborations. Feel free to reach
                        out if you want to build something amazing together.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <MagneticButton
                            as="a"
                            href={`mailto:${email}`}
                            magneticStrength={0.25}
                            className="relative bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-xl inline-block overflow-hidden shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-shadow"
                        >
                            {/* Shimmer effect */}
                            <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                                initial={{ x: '-200%' }}
                                whileHover={{
                                    x: '200%',
                                    transition: { duration: 0.8, ease: 'easeInOut' },
                                }}
                            />
                            <span className="relative z-10">Say Hello</span>
                        </MagneticButton>
                    </motion.div>

                    {/* Decorative dots */}
                    <div className="flex justify-center mt-12 space-x-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-stone-300 rounded-full"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
