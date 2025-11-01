import PROJECTS from "../../lib/projects"
import ProjectCard from "../ProjectCard"

function ProjectsTab() {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-4">Selected Projects</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </section>
    )
}

export default ProjectsTab