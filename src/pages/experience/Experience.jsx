import "./Experience.css";
import { useThemeContext } from "../../hooks/useThemeContext";
const experiences = [
  {
    start: "March 2020",
    end: " August 2020",
    title: "Preparateur de commande",
    details:
      "Je m'occupais de l'entrée et la sortie des marchandises dans une usine de métal.",
    location: "Dakar Sénégal",
    techno: null,
    active: false,
    link: null,
  },
  {
    start: "March 2020",
    end: " August 2020",
    title: "Stage de developpement Web",
    details: `Réalisation d'une application web
de CallCenter a l'aide d'ExpressJS
pour le serveur Web et Asterisk
pour le serveur VOIP et MongoDb
pour la base de donnée.
`,
    location: "Dakar Senegal",
    techno: "Nodejs, ExpressJs, MongoDb,Asterisk",
    active: false,
    link: "www.google.com",
  },
  {
    start: "March 2020",
    end: " August 2020",
    title: "Stage de developpement Web",
    details: `Réalisation d'une application web
de CallCenter a l'aide d'ExpressJS
pour le serveur Web et Asterisk
pour le serveur VOIP et MongoDb
pour la base de donnée.
`,
    location: "Dakar Senegal",
    techno: "Nodejs, ExpressJs, MongoDb,Asterisk",
    active: false,
    link: "www.google.com",
  },
];

export function Experience() {
  const {theme} = useThemeContext()
  return (
    <div id="experience" style={{ backgroundColor: theme.backgroundOdd }} className="experience">
      <div className="left-expe">
        <h1 style={{ color: theme.greyTitleColor }}>Experience</h1>
      </div>
      <div className="right-expe">
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
                  <h1>{experience.title}</h1>
                  <h5>{experience.start}-{experience.end}.{experience.location}</h5>
                  <ul>
                    <li>Details: {experience.details}</li>
                   {experience.techno && <li>Techno: {experience.techno}</li>}
                    {experience.link && <li>Lien: {experience.link}</li>}
                  </ul>
                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
