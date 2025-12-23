import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { Project } from '../lib/projects';
import RepoLinks from './buttons/RepoButton';

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function ProjectCard({ project, isExpanded, onToggleExpand }: ProjectCardProps) {
  const [isTouch, setIsTouch] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Detect if the device supports touch
    if (typeof window !== 'undefined') {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  // For touch screens, toggle overlay on tap
  const handleToggleOverlay = () => {
    if (isTouch) {
      setShowOverlay((prev) => !prev);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={!isTouch ? { scale: 1.03 } : {}}
      className="group relative rounded-xl overflow-hidden shadow-lg border border-white/10 bg-linear-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-md hover:shadow-2xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col"
      onClick={handleToggleOverlay}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-48 md:h-56 overflow-hidden bg-gray-800">
        <img
          src={project.thumbnail || '/thumb/github.png'}
          alt={project.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isTouch ? (showOverlay ? 1 : 0) : undefined }}
          whileHover={!isTouch ? { opacity: 1 } : {}}
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
            <h3 className="text-lg font-semibold text-gray-100 group-hover:text-indigo-400 transition-colors truncate">
              {project.title}
            </h3>
            <div className="text-xs text-gray-400 mt-1">
              {project.year} • {project.tech.slice(0, 3).join(' • ')}
              {project.tech.length > 3 ? ' • …' : ''}
            </div>
          </div>
        </div>

        <p className={`text-sm text-gray-300 mt-3 leading-relaxed grow ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <AnimatePresence mode="sync">
            {(isExpanded ? project.tech : project.tech.slice(0, 3)).map((tech) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-gray-300"
              >
                {tech}
              </motion.span>
            ))}
            {!isExpanded && project.tech.length > 3 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="text-xs px-2 py-1 bg-blue-600/20 border border-blue-500/30 rounded-md text-blue-400"
              >
                +{project.tech.length - 3}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          className="mt-4 flex items-center gap-1 cursor-pointer text-xs text-blue-400 hover:text-blue-300 transition-colors self-start"
        >
          {isExpanded ? (
            <>
              <FiChevronUp className="w-3.5 h-3.5" />
              Show Less
            </>
          ) : (
            <>
              <FiChevronDown className="w-3.5 h-3.5" />
              Show More
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
