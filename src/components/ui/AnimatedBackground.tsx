import { motion } from 'framer-motion';

export function AnimatedBackground() {
    const blobs = [
        {
            color: 'from-teal-200/30 to-teal-300/20',
            size: 'w-96 h-96',
            position: 'top-20 -left-48',
            duration: 20,
            delay: 0,
        },
        {
            color: 'from-stone-200/40 to-stone-300/20',
            size: 'w-80 h-80',
            position: 'top-40 right-0',
            duration: 25,
            delay: 5,
        },
        {
            color: 'from-teal-100/30 to-emerald-200/20',
            size: 'w-72 h-72',
            position: 'bottom-20 left-1/3',
            duration: 22,
            delay: 10,
        },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {blobs.map((blob, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${blob.size} ${blob.position} rounded-full bg-gradient-to-br ${blob.color} blur-3xl`}
                    animate={{
                        x: [0, 30, -20, 0],
                        y: [0, -20, 30, 0],
                        scale: [1, 1.1, 0.95, 1],
                    }}
                    transition={{
                        duration: blob.duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: blob.delay,
                    }}
                />
            ))}
        </div>
    );
}
