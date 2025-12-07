import { motion } from 'framer-motion';

interface FooterProps {
    name: string;
}

export function Footer({ name }: FooterProps) {
    return (
        <motion.footer
            className="bg-white border-t border-stone-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-6 py-6 text-center text-stone-500">
                <p>&copy; {new Date().getFullYear()} {name}. All Rights Reserved.</p>
            </div>
        </motion.footer>
    );
}
