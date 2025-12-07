import { useState, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glareEnabled?: boolean;
}

export function TiltCard({
    children,
    className = '',
    tiltAmount = 10,
    glareEnabled = true,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${tiltAmount}deg`, `-${tiltAmount}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${tiltAmount}deg`, `${tiltAmount}deg`]);

    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['0%', '100%']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative ${className}`}
            style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {children}

            {/* Glare effect */}
            {glareEnabled && (
                <motion.div
                    className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
                    style={{
                        opacity: isHovered ? 0.15 : 0,
                        background: `radial-gradient(circle at ${glareX} ${glareY}, white, transparent 50%)`,
                    }}
                />
            )}
        </motion.div>
    );
}
