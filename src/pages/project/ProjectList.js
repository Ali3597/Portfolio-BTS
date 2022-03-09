import { motion } from "framer-motion";
export function ProjectList({ project }) {
  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.7 }}
      className="project-list"
    >
      <div className="project-list-left">
        <h1>{project.title}</h1>
        <p>{project.details}</p>
      </div>
      <div className="project-list-right">
        <img src={project.photo} alt="project" width="80%" height="60%" />
      </div>
    </motion.div>
  );
}
