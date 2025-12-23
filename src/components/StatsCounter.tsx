import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StatItemProps {
    end: number;
    label: string;
    suffix?: string;
    duration?: number;
}

function StatItem({ end, label, suffix = '', duration = 2 }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-1">
                {count}{suffix}
            </div>
            <div className="text-sm text-gray-400">{label}</div>
        </motion.div>
    );
}

interface StatsCounterProps {
    projects?: number;
    commits?: number;
    years?: number;
}

function StatsCounter({ projects = 50, commits = 1000, years = 3 }: StatsCounterProps) {
    return (
        <div className="mt-8 p-6 rounded-lg bg-linear-to-br from-blue-500/5 to-purple-500/5 border border-white/10">
            <div className="grid grid-cols-3 gap-6">
                <StatItem end={projects} label="Projects Built" suffix="+" />
                <StatItem end={commits} label="GitHub Commits" suffix="+" />
                <StatItem end={years} label="Years Experience" suffix="+" />
            </div>
        </div>
    );
}

export default StatsCounter;
