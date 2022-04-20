import { useEffect, useState } from "react";
import "./Project.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { ProjectFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";
import { motion, AnimatePresence } from "framer-motion";
import { useCollection } from "../../hooks/useCollection";

export function Project() {
  const {theme} = useThemeContext()
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filters, setFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([])
  const  { documents: projects } = useCollection("projects")
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  useEffect(() => {
    console.log(projects,"alalalalalal")
    if (projects) {
      // set filters
      let results = ["All"];
      projects.map((project) => {
        if (!results.includes(project.type)) {
          results.push(project.type);
        }
      });
      setFilters(results);
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
      })
      setFilteredProjects(pass)
    }
  }, [currentFilter,projects]);
  
  return (
    <div id="projects" style={{ height: `${filteredProjects.length*23+15}vh`,backgroundColor: theme.backgroundOdd }}  className="block">
      <div className="left-project left">
        <h1 style={{ color: theme.greyTitleColor }}>Projets</h1>
      </div>
      {projects &&
        <div className="right-project right">
          <ProjectFilter currentFilter={currentFilter}
            changeFilter={changeFilter} filters={filters} theme={theme} />
          <motion.div layout>
            <AnimatePresence>
              {filteredProjects && filteredProjects.map((p, index) => (<ProjectList key={index} project={p} theme={theme} />))}
            </AnimatePresence>
          </motion.div>
        </div>}
    </div>
  );
}
