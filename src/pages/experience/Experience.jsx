import "./Experience.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";

export function Experience() {
  const { theme } = useThemeContext()
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
      </div>
      <div className="right-expe right">
        {experiences &&
          experiences.map((experience, index) => (
            <div key={index}>
              <div className="bord">
                <div className={index == 0 ? "trait" : " trait trait-bord"}>
                  <div> </div>
                  <div> </div>
                </div>
                <div className="dot"> </div>
                <div
                  className={
                    index == experiences.length - 1
                      ? "trait"
                      : " trait trait-bord"
                  }
                >
                  <div> </div>
                  <div> </div>
                </div>
              </div>
              <div className="detail-expe">
                <div style={{ backgroundColor: theme.cardBackground }} className="card-expe">
                  <h1 style={{ color: theme.date}}>{experience.company}</h1>
                  {experience.projectLink && <a href={experience.projectLink} target="_blank">{experience.project}</a>}
                  <h5 style={{ color: theme.date}}>{ experience.start.toDate().toLocaleDateString("fr") }-{experience.end.toDate().toLocaleDateString("fr")} . {experience.location}</h5>
                  <ul style={{ color: theme.basicColor }}>
                    <li> <span>Details</span> : {experience.details}</li>
                    {experience.technos && <li> <span>Techno</span> : <ul>
                      {experience.technos.map((t,index) => (
                        <li key={index}> {t} </li>
                      ))}
                    </ul></li>}
                    
                  </ul>
        
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
