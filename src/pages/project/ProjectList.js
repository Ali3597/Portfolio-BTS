import { motion } from "framer-motion";
import { Link } from "../../components/IconLink";

import { FaLink } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import projectDefault from "../../assets/project.png";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export function ProjectList({ project, theme }) {
  console.log(project.photo);
  return (
    <motion.div
      layout
      animate={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.7 }}
      className="project-list"
    >
      <div style={{ color: theme.basicColor }} className="project-list-left">
        <h1>{project.title}</h1>
        <p>{project.details}</p>

        <div className="project-left-links">
          {project.githubLink && (
            <Link
              icon={<AiFillGithub size={15} />}
              p={"Code"}
              psize={11}
              link={project.github}
            />
          )}
          {project.projectLink && (
            <Link
              icon={<FaLink size={15} />}
              p={"Project"}
              psize={11}
              link={project.projectLink}
            />
          )}
          {project.resume && (
            <Link
              icon={<HiOutlineDocumentSearch size={15} />}
              p={"Resume"}
              psize={11}
              link={project.resume}
            />
          )}
        </div>
      </div>
      <div className="project-list-right">
        <img
          src={project.photo ? project.photo : projectDefault}
          alt="project"
          width="80%"
          height="60%"
        />
      </div>
    </motion.div>
  );
}
