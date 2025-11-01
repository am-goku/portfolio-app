import { motion } from 'framer-motion';
import type { Project } from '../lib/projects';
import RepoLinks from './buttons/RepoButton';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <motion.article
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col"
        >
            {/* Thumbnail */}
            <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-800">
                <img
                    src={project.thumbnail || '/thumb/github.png'}
                    alt={project.title}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                    <RepoLinks repos={project.repos} live={project.live} />
                </motion.div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col grow">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors">
                            {project.title}
                        </h3>
                        <div className="text-xs text-gray-400 mt-1">
                            {project.year} • {project.tech.slice(0, 3).join(' • ')}
                            {project.tech.length > 3 ? ' • …' : ''}
                        </div>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{project.repos.length} repo(s)</span>
                </div>

                <p className="text-sm text-gray-300 mt-3 leading-relaxed flex-grow">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tech.slice(0, 5).map((tech, i) => (
                        <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.article>
    );
}