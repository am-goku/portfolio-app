import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    opacity: number;
}

const COLORS = [
    '#60a5fa', // blue-400
    '#818cf8', // indigo-400
    '#a78bfa', // violet-400
    '#c084fc', // purple-400
    '#38bdf8', // sky-400
    '#22d3ee', // cyan-400
];

const SparkleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas to full screen
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Track mouse movement
        const handleMouseMove = (e: MouseEvent) => {
            const prevX = mousePos.current.x;
            const prevY = mousePos.current.y;
            mousePos.current = { x: e.clientX, y: e.clientY };

            // Calculate velocity for particle direction
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // Spawn particles based on cursor movement
            if (speed > 2) {
                const particleCount = Math.min(Math.floor(speed / 5), 5);
                for (let i = 0; i < particleCount; i++) {
                    spawnParticle(e.clientX, e.clientY, -dx * 0.1, -dy * 0.1);
                }
            }
        };

        const spawnParticle = (x: number, y: number, baseVx: number, baseVy: number) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 0.5;
            const life = Math.random() * 40 + 20;

            particles.current.push({
                x: x + (Math.random() - 0.5) * 10,
                y: y + (Math.random() - 0.5) * 10,
                vx: baseVx + Math.cos(angle) * speed,
                vy: baseVy + Math.sin(angle) * speed,
                life,
                maxLife: life,
                size: Math.random() * 3 + 1,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                opacity: 1,
            });

            // Limit particle count for performance
            if (particles.current.length > 150) {
                particles.current = particles.current.slice(-100);
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current = particles.current.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98; // Friction
                p.vy *= 0.98;
                p.vy += 0.02; // Slight gravity
                p.life--;
                p.opacity = p.life / p.maxLife;

                if (p.life <= 0) return false;

                // Draw sparkle
                ctx.save();
                ctx.globalAlpha = p.opacity * 0.8;
                ctx.fillStyle = p.color;

                // Draw star shape
                ctx.beginPath();
                const spikes = 4;
                const outerRadius = p.size;
                const innerRadius = p.size * 0.4;

                for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const x = p.x + Math.cos(angle) * radius;
                    const y = p.y + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();

                // Add glow effect
                ctx.shadowColor = p.color;
                ctx.shadowBlur = 8;
                ctx.fill();

                ctx.restore();

                return true;
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};

export default SparkleBackground;
