import { motion } from "framer-motion";
import { Link } from "../../components/IconLink";

import { FaLink } from "react-icons/fa";
import { AiFillGithub } from "react-icons/ai";
import projectDefault from "../../assets/project.png";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import React, { useEffect, useRef, useState } from "react";

export const ProjectList = React.memo(function ({
  project,
  theme,
  setSize,
  random,
}) {
  const myRef = useRef();
  useEffect(() => {
    if (myRef.current) {
      setSize((prevSize) => prevSize + myRef.current.clientHeight);
    }
  }, [myRef.current, random]);

  return (
    <motion.div
      layout
      animate={{ opacity: 1, visibility: "visible" }}
      initial={{ opacity: 0, visibility: "hidden" }}
      exit={{ opacity: 0, visibility: "hidden" }}
      transition={{ duration: 0.5 }}
      className="project-list"
      ref={myRef}
    >
      <div style={{ color: theme.basicColor }} className="project-list-left">
        <h1>{project.title}</h1>
        <p>{project.details}</p>

        <div className="project-left-links">
          {project.githubLink && (
            <Link
              icon={<AiFillGithub size={20} />}
              p={"Code"}
              psize={11}
              link={project.github}
            />
          )}
          {project.projectLink && (
            <Link
              icon={<FaLink size={20} />}
              p={"Projet"}
              psize={11}
              link={project.projectLink}
            />
          )}
          {project.resume && (
            <Link
              icon={<HiOutlineDocumentSearch size={20} />}
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
          width="150px"
          height="80px"
        />
      </div>
    </motion.div>
  );
});
