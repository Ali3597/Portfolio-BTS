import "./Experience.css";
import { useThemeContext } from "../../hooks/useThemeContext";
const experiences = [
  {
    start: "Janvier 2022",
    end: "Mars 2022",
    title: "Stage de developpement Web",
    details: `Réalisation entière et mise en
ligne d'un e-commerce à l'aide de
Symfony et MySQL.'
`,
    location: "Dakar Senegal",
    techno: ["PHP","Symfony","Javascript"],
    active: false,
    link: "https://www.google.com",
    project:"Voip"
  },
    {
    start: "Mars 2021",
    end: " Août 2021",
    title: "Stage de developpement Web",
    details: `Réalisation d'une application web
de CallCenter a l'aide d'ExpressJS
pour le serveur Web et Asterisk
pour le serveur VOIP et MongoDb
pour la base de donnée.
`,
    location: "Dakar Senegal",
    techno: ["Nodejs","Express","React","Asterisk"],
    active: false,
    link: "https://www.google.com",
    project:"Callcenter"
  },
    {
    start: "Septembre 2018",
    end: "Août 2019",
    title: "Preparateur de commande",
    details:
      "Je m'occupais de l'entrée et la sortie des marchandises dans une usine de métal.",
    location: "Dakar Sénégal",
    techno: null,
    active: false,
    link: null,
    project:null,
  },
  {
    start: "Septembre 2019",
    end: "Août 2020",
    title: "Commertial",
    details:
      "Vente de produits dans une usine de métal",
    location: "Dakar Sénégal",
    techno: null,
    active: false,
    link: null,
    project:null,
  },
  
  
];

export function Experience() {
  const {theme} = useThemeContext()
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
                  <h1 style={{ color: theme.date}}>{experience.title}</h1>
                  {experience.link && <a href={experience.link} target="_blank">{experience.project}</a>}
                  <h5 style={{ color: theme.date}}>{experience.start}-{experience.end} . {experience.location}</h5>
                  <ul style={{ color: theme.basicColor }}>
                    <li> <span>Details</span> : {experience.details}</li>
                    {experience.techno && <li> <span>Techno</span> : <ul>
                      {experience.techno.map((t,index) => (
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
