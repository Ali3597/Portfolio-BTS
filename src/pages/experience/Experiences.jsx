import "./Experiences.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCollection } from "../../hooks/useCollection";
import { useEffect, useState } from "react";
import { Experience } from "./Experience";
import { ExperienceAdmin } from "./ExperienceAdmin";
import { FaEdit } from "react-icons/fa";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useToggle } from "../../hooks";

export function Experiences() {
  const [admin, toggleAdmin] = useToggle(false);
  const { theme } = useThemeContext()
  const {user} = useAuthContext()
  const { documents: experiences } = useCollection("experiences")

  const [adminExperiences, setAdminExperiences] = useState([]);

  useEffect(() => {
    if (experiences) {
      const newExperience = {
        start: null,
        end: null,
        location: null,
        project: null,
        projectLink: null,
        technos : null,
        active: false,
        company: null,
        detailsList:null,
        details: null,
      };
      setAdminExperiences([...experiences, newExperience]);
    }
  }, [experiences]);

  

  return (
    <div id="experience" style={{ backgroundColor: theme.backgroundOdd }} className="experience block">
      <div className="left-expe left">
        <h1 style={{ color: theme.greyTitleColor }}>Experience</h1>
           {user && <FaEdit onClick={toggleAdmin} cursor={"pointer"} />}
      </div>
      <div className="right-expe right">
        {experiences && !admin &&
          experiences.map((experience, index) => (
            <Experience experience={experience} key={experience.id} index={index} allExperiences={experiences.length} theme={theme} />
          ))}
         {adminExperiences && admin &&
          adminExperiences.map((experience, index
          ) => (
            <ExperienceAdmin experience={experience} key={experience.id ? experience.id : index}  />
          ))}
      </div>
    </div>
  );
}
