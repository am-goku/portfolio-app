import { motion } from 'framer-motion';
import PROFILE, { EDUCATION } from '../../lib/data'
import { FaGraduationCap, FaLaptopCode, FaBookOpen, FaRocket, FaTools } from 'react-icons/fa';

function HomeTab() {
    return (
        <section>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <h2 className="text-3xl font-semibold mb-2">Hello — I'm {PROFILE.name}</h2>
                <p className="text-gray-200 max-w-3xl leading-7">
                    Dynamic Full‑Stack Developer focused on building scalable, high‑performance web
                    applications using the MERN stack, NestJS and modern frontend frameworks. I design clean,
                    maintainable code and ship reliable products — from prototyping to production.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-blue-500/50 hover:-translate-y-1 transition-all duration-300 will-change-transform"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaRocket className="text-blue-400" />
                            <h4 className="font-medium">Current Focus</h4>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">Building real‑time and production‑ready apps, microservices and APIs. Improving observability and automated deployments.</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-lg bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 will-change-transform"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <FaTools className="text-purple-400" />
                            <h4 className="font-medium">Tools & Practice</h4>
                        </div>
                        <p className="text-sm text-gray-300 mt-2">Docker, AWS, Redis, RabbitMQ, CI/CD, TDD where appropriate, and fast iteration using Agile processes.</p>
                    </motion.div>
                </div>

                <div className="mt-8">
                    <div className="flex items-center gap-2 mb-6">
                        <FaBookOpen className="text-xl text-blue-400" />
                        <h4 className="font-medium text-lg">Education & Training</h4>
                    </div>

                    <div className="relative space-y-6 pl-8">
                        {/* Timeline line */}
                        <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-linear-to-b from-blue-500/50 via-purple-500/50 to-transparent"></div>

                        {/* Education Cards - Dynamic rendering */}
                        {EDUCATION.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + (index * 0.2), duration: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                className="relative p-5 rounded-lg bg-linear-to-br from-white/5 to-white/2 border border-white/10 hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 will-change-transform group"
                            >
                                {/* Timeline dot */}
                                <div className={`absolute -left-8 top-6 w-8 h-8 rounded-full bg-linear-to-br ${edu.color === 'blue' ? 'from-blue-500 to-purple-600' : 'from-purple-500 to-pink-600'
                                    } flex items-center justify-center ring-4 ring-gray-900/50`}>
                                    {edu.type === 'training' ? (
                                        <FaLaptopCode className="text-white text-sm" />
                                    ) : (
                                        <FaGraduationCap className="text-white text-sm" />
                                    )}
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-1">
                                        <h5 className={`text-lg font-semibold text-gray-100 group-hover:text-${edu.color}-400 transition-colors duration-200`}>
                                            {edu.institution}
                                        </h5>
                                        <p className="text-sm font-medium text-gray-300 mt-1">{edu.program}</p>
                                        <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                            <span className={`inline-block w-1.5 h-1.5 rounded-full bg-${edu.color}-400`}></span>
                                            {edu.duration}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

export default HomeTab