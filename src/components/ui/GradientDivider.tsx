import { ReactNode } from 'react';

interface GradientDividerProps {
    className?: string;
    direction?: 'up' | 'down';
    children?: ReactNode;
}

export function GradientDivider({ className = '', direction = 'down' }: GradientDividerProps) {
    const gradientClass = direction === 'down'
        ? 'bg-gradient-to-b from-transparent via-stone-100/50 to-transparent'
        : 'bg-gradient-to-t from-transparent via-stone-100/50 to-transparent';

    return (
        <div className={`h-32 ${gradientClass} ${className}`} />
    );
}

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    bgColor?: string;
    withTopGradient?: boolean;
    withBottomGradient?: boolean;
}

export function SectionWrapper({
    children,
    className = '',
    id,
    bgColor = 'bg-white',
    withTopGradient = false,
    withBottomGradient = false,
}: SectionWrapperProps) {
    return (
        <div className={`relative ${bgColor}`}>
            {withTopGradient && (
                <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-stone-50/80 to-transparent pointer-events-none" />
            )}
            <section id={id} className={`relative ${className}`}>
                {children}
            </section>
            {withBottomGradient && (
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-50/80 to-transparent pointer-events-none" />
            )}
        </div>
    );
}
