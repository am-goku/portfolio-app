import { motion } from 'framer-motion';
import PROFILE from '../../lib/data'

function HomeTab() {
    return (
        <section>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <h2 className="text-3xl font-semibold mb-2">Hello — I’m {PROFILE.name}</h2>
                <p className="text-gray-200 max-w-3xl leading-7">
                    Dynamic Full‑Stack Developer focused on building scalable, high‑performance web
                    applications using the MERN stack, NestJS and modern frontend frameworks. I design clean,
                    maintainable code and ship reliable products — from prototyping to production.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-linear-to-br from-white/5 to-white/2">
                        <h4 className="font-medium">Current Focus</h4>
                        <p className="text-sm text-gray-300 mt-2">Building real‑time and production‑ready apps, microservices and APIs. Improving observability and automated deployments.</p>
                    </div>

                    <div className="p-4 rounded-lg bg-linear-to-br from-white/5 to-white/2">
                        <h4 className="font-medium">Tools & Practice</h4>
                        <p className="text-sm text-gray-300 mt-2">Docker, AWS, Redis, RabbitMQ, CI/CD, TDD where appropriate, and fast iteration using Agile processes.</p>
                    </div>
                </div>

                <div className="mt-8">
                    <h4 className="font-medium mb-3">Education & Training</h4>
                    <div className="text-sm text-gray-300">
                        <strong>Brototype</strong> — MERN Stack Development Program (2022 – 2024)
                        <br />
                        <strong>St. Thomas College</strong> — B.Com (2019 – 2022)
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default HomeTab