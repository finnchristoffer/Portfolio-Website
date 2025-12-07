import { useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    magneticStrength?: number;
    as?: 'button' | 'a';
    href?: string;
    onClick?: () => void;
    target?: string;
    rel?: string;
}

export function MagneticButton({
    children,
    className = '',
    magneticStrength = 0.3,
    as = 'button',
    href,
    onClick,
    target,
    rel,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 300, damping: 20 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = (e.clientX - centerX) * magneticStrength;
        const distanceY = (e.clientY - centerY) * magneticStrength;

        x.set(distanceX);
        y.set(distanceY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const Component = as === 'a' ? motion.a : motion.button;

    const props = as === 'a' ? { href, target, rel } : { onClick };

    return (
        <div
            ref={ref}
            className="inline-block"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <Component
                className={className}
                style={{ x: springX, y: springY }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {children}
            </Component>
        </div>
    );
}
