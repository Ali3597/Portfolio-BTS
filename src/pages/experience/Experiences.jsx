import "./Experiences.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";
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
  useEffect(() => {
    if (experiences) {
      experiences.map((expe) => {
        console.log(expe.start.toDate().toLocaleDateString("fr"))
      })
    }
    
  },[experiences])

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
         {experiences && admin &&
          experiences.map((experience) => (
            <ExperienceAdmin experience={experience}  />
          ))}
      </div>
    </div>
  );
}
