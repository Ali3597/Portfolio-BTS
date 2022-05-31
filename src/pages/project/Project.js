import { useEffect, useState } from "react";
import "./Project.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { ProjectFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";
import { FaEdit } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useToggle } from "../../hooks";
import { ProjectListAdmin } from "./ProjectListAdmin";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "../../hooks/useCollection";

export function Project() {
  const { user } = useAuthContext();
  const { theme } = useThemeContext();
  const [currentFilter, setCurrentFilter] = useState("All");
  const [admin, toggleAdmin] = useToggle(false);
  const [filters, setFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [adminProjects, setAdminProjects] = useState([]);
  const [random, setRandom] = useState(null);
  const { documents: projects } = useCollection("projects");
  const [size, setSize] = useState(50);
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  // useEffect(() => {
  //   setSize(50);
  // }, [theme]);
  useEffect(() => {
    if (projects) {
      const newProject = {
        details: null,
        id: null,
        githubLink: null,
        projectLink: null,
        title: null,
        type: null,
      };
      setAdminProjects([...projects, newProject]);
    }
  }, [projects]);
  useEffect(() => {
    console.log("ojkkk");
  }, []);

  useEffect(() => {
    if (projects && !admin) {
      let results = ["All"];
      projects.map((project) => {
        if (!results.includes(project.type)) {
          results.push(project.type);
        }
      });
      setFilters(results);
      setCurrentFilter("All");
    }
  }, [admin, projects]);

  useEffect(() => {
    if (projects) {
      setSize(50);
      const newRandom = Date.now();
      setFilteredProjects([]);
      setRandom(newRandom);

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
  }, [currentFilter, projects, theme]);
  useEffect(() => {
    if (size) {
      console.log(size, "ma belle size ");
    }
  }, [size]);

  return (
    <div
      id="projects"
      style={{
        backgroundColor: theme.backgroundOdd,
      }}
      className="block"
    >
      <div className="left-project left">
        <h1 style={{ color: theme.greyTitleColor }}>Projets</h1>
        {user && <FaEdit onClick={toggleAdmin} cursor={"pointer"} />}
      </div>
      {!admin && projects && (
        <div
          className="right-project right"
          style={{
            height: `${size + 50}px`,
          }}
        >
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
                  <ProjectList
                    key={index}
                    project={p}
                    theme={theme}
                    setSize={setSize}
                    random={random}
                  />
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
      {admin && projects && (
        <div className="list-admin">
          {adminProjects.map((p, index) => (
            <ProjectListAdmin key={p.id ? p.id : index} project={p} />
          ))}
        </div>
      )}
    </div>
  );
}
