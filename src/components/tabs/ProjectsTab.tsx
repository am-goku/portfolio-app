import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import PROJECTS from "../../lib/projects"
import ProjectCard from "../ProjectCard"

function ProjectsTab() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showAllTags, setShowAllTags] = useState(false);
    const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

    // Extract all unique technologies from projects
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        PROJECTS.forEach(project => {
            project.tech.forEach(tech => tags.add(tech));
        });
        return Array.from(tags).sort();
    }, []);

    // Show first 5 tags when collapsed, all tags when expanded
    const COLLAPSED_TAG_COUNT = 5;
    const visibleTags = showAllTags ? allTags : allTags.slice(0, COLLAPSED_TAG_COUNT);

    // Filter projects based on selected tags
    const filteredProjects = useMemo(() => {
        if (selectedTags.length === 0) {
            return PROJECTS;
        }
        return PROJECTS.filter(project =>
            project.tech.some(tech => selectedTags.includes(tech))
        );
    }, [selectedTags]);

    // Toggle tag selection
    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedTags([]);
    };

    return (
        <section>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-semibold mb-4"
            >
                Projects
            </motion.h2>

            {/* Filter Tags */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-400">Filter by:</span>
                    <span className="text-xs text-gray-500">
                        {selectedTags.length > 0 ? `${filteredProjects.length} of ${PROJECTS.length}` : `${PROJECTS.length} projects`}
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* All Button */}
                    <button
                        onClick={clearFilters}
                        className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${selectedTags.length === 0
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        All
                    </button>

                    {/* Technology Tags */}
                    <AnimatePresence mode="popLayout">
                        {visibleTags.map((tag) => (
                            <motion.button
                                key={tag}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${selectedTags.includes(tag)
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                                    }`}
                            >
                                {tag}
                            </motion.button>
                        ))}
                    </AnimatePresence>

                    {/* Show More/Less Button */}
                    {allTags.length > COLLAPSED_TAG_COUNT && (
                        <button
                            onClick={() => setShowAllTags(!showAllTags)}
                            className="px-3 py-1.5 rounded-full text-sm whitespace-nowrap bg-white/5 text-blue-400 hover:bg-white/10 transition-all border border-blue-400/30"
                        >
                            {showAllTags ? '− Show Less' : `+ ${allTags.length - COLLAPSED_TAG_COUNT} More`}
                        </button>
                    )}
                </div>
            </div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedTags.join(',')}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((p, index) => (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <ProjectCard
                                    project={p}
                                    isExpanded={expandedCardId === p.id}
                                    onToggleExpand={() => setExpandedCardId(expandedCardId === p.id ? null : p.id)}
                                />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-12"
                        >
                            <p className="text-gray-400 text-lg">No projects found with selected technologies.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    )
}

export default ProjectsTab
