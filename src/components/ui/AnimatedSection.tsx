import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export function AnimatedSection({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const getInitialPosition = () => {
        switch (direction) {
            case 'up':
                return { y: 50, x: 0 };
            case 'down':
                return { y: -50, x: 0 };
            case 'left':
                return { y: 0, x: 50 };
            case 'right':
                return { y: 0, x: -50 };
            case 'none':
                return { y: 0, x: 0 };
        }
    };

    const initial = getInitialPosition();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...initial }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...initial }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
