import { useEffect, useState } from "react";
import "./Project.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { ProjectFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";
import { ProjectListAdmin } from "./ProjectListAdmin";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import { FaPlusCircle } from "react-icons/fa";

export function Project({ admin }) {
  const { theme } = useThemeContext();
  const [currentFilter, setCurrentFilter] = useState("All");

  const [filters, setFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const { documents: projects } = useCollection("projects");
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  useEffect(() => {
    if (projects) {
      // set filters
      let results = ["All"];
      projects.map((project) => {
        if (!results.includes(project.type)) {
          results.push(project.type);
        }
      });
      setFilters(results);
      setAdminProjects(projects);
    }
  }, [projects]);
  useEffect(() => {
    if (projects) {
      let pass = projects.filter((project) => {
        switch (currentFilter) {
          case "All":
            return true;
          default:
            return project.type === currentFilter;
        }
      });
      setFilteredProjects(pass);
    }
  }, [currentFilter, projects]);

  const handleClick = () => {
    const newProject = {
      details: null,
      id: null,
      githubLink: null,
      projectLink: null,
      title: null,
      type: null,
    };

    setAdminProjects([...adminProjects, newProject]);
  };

  return (
    <div
      id="projects"
      style={{ backgroundColor: theme.backgroundOdd }}
      className="block"
    >
      <div className="left-project left">
        <h1 style={{ color: theme.greyTitleColor }}>Projets</h1>
      </div>
      {!admin && projects && (
        <div className="right-project right">
          <ProjectFilter
            currentFilter={currentFilter}
            changeFilter={changeFilter}
            filters={filters}
            theme={theme}
          />
          <motion.div layout>
            <AnimatePresence>
              {filteredProjects &&
                filteredProjects.map((p, index) => (
                  <ProjectList key={index} project={p} theme={theme} />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
      {admin && projects && (
        <div className="list-admin">
          {adminProjects.map((p, index) => (
            <ProjectListAdmin key={index} project={p} />
          ))}
          <FaPlusCircle
            size={50}
            color={"green"}
            cursor={"pointer"}
            onClick={handleClick}
          />
        </div>
      )}
    </div>
  );
}
