import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
    title?: string;
    icon?: ReactNode;
    children: ReactNode;
    hoverable?: boolean;
    className?: string;
}

/**
 * Reusable Card component with consistent styling and optional hover effects.
 * Used across the portfolio for Current Focus, Tools & Practice, and other card-based layouts.
 */
export function Card({ title, icon, children, hoverable = false, className = '' }: CardProps) {
    return (
        <motion.div
            whileHover={hoverable ? { scale: 1.02 } : undefined}
            className={`p-4 rounded-lg bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-white/20 transition-[border-color] duration-200 ${hoverable ? 'will-change-transform' : ''} ${className}`}
        >
            {(title || icon) && (
                <div className="flex items-center gap-2 mb-2">
                    {icon}
                    {title && <h4 className="font-medium">{title}</h4>}
                </div>
            )}
            {children}
        </motion.div>
    );
}

export default Card;
