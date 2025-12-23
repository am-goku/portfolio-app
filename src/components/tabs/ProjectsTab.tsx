import { motion } from 'framer-motion';
import PROJECTS from "../../lib/projects"
import ProjectCard from "../ProjectCard"

function ProjectsTab() {
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((p, index) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ProjectCard project={p} />
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default ProjectsTab