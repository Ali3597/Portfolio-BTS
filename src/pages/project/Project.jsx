import { useEffect, useState } from "react";
import "./Project.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { ProjectFilter } from "./ProjectsFilter";
import { ProjectList } from "./ProjectList";
import { motion ,AnimatePresence} from "framer-motion";

const projects = [
  {
    type: "PHP",
    title: "Calcenter",
    project: "",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    link: "google.com",
    photo: "https://img.freepik.com/photos-gratuite/gros-plan-belle-fleur-daisy-oxeye_181624-11106.jpg?size=626&ext=jpg",
  },
  {
    type: "PHP",
    title: "site web symfony",
    project: null,
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    link: "google.com",
    photo: "https://img.freepik.com/photos-gratuite/gros-plan-belle-fleur-daisy-oxeye_181624-11106.jpg?size=626&ext=jpg",
  },
  {
    type: "Javascript",
    title: "Echec en python ",
    project: "google.com",
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    link: "google.com",
    photo: "https://img.freepik.com/photos-gratuite/gros-plan-belle-fleur-daisy-oxeye_181624-11106.jpg?size=626&ext=jpg",
  },
  {
    type: "Python",
    title: "Spotify like",
    project: null,
    details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    link: "google.com",
    photo: "https://img.freepik.com/photos-gratuite/gros-plan-belle-fleur-daisy-oxeye_181624-11106.jpg?size=626&ext=jpg",
  },
];

export function Project() {
  const {theme} = useThemeContext()
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filters, setFilters] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([])
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
  }, [currentFilter]);
  
  return (
    <div id="projects" style={{ height: `${filteredProjects.length*21}vh`,backgroundColor: theme.backgroundOdd }}  className="project">
      <div className="left-project">
        <h1>Project</h1>
      </div>
      <div className="right-project">
        <ProjectFilter currentFilter={currentFilter}
          changeFilter={changeFilter} filters={filters} />
        <motion.div layout>
          <AnimatePresence>
        {filteredProjects && filteredProjects.map((p,index)=>(<ProjectList key={index} project={p} />) )}
        </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
