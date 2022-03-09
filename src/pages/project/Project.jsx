import { useEffect, useState } from "react";
import "./Project.css";
import { ProjectFilter } from "./ProjectsFilter";
import { ProjectsList } from "./ProjectsList";
const documents = [
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
  const [currentFilter, setCurrentFilter] = useState("All");
  const [filters, setFilters] = useState([]);
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  useEffect(() => {
    if (documents) {
      let results = ["All"];
      documents.map((project) => {
        if (!results.includes(project.type)) {
          results.push(project.type);
        }
      });
      setFilters(results);
      
    }
  }, [documents]);
  const projects = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "All":
            return true;
          default:
            return document.type === currentFilter;

        }
      })
    : null;
  return (
    <div className="project">
      <div className="left-project">
        <h1>Project</h1>
      </div>
      <div className="right-project">
        <ProjectFilter currentFilter={currentFilter}
          changeFilter={changeFilter} filters={filters} />
        <ProjectsList projects={projects} />
      </div>
    </div>
  );
}
