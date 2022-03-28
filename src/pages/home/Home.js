import "./Home.css";
import identite from "../../assets/identite.jpg";
import { FaGraduationCap } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";

const interests = [
  { title: "Competence 1" },
  { title: "Competence 2" },
  { title: "Competence 3" },
  { title: "Competence 4" },
];
const Educations = [
  {
    title: "Ecole d'ingenierie EPSI",
    beginDate: "2020",
    endDate: "En cours",
    location: "Bordeaux France",
  },
  {
    title: "Arrivée en licence 3 de Mathematique",
    beginDate: "2014",
    endDate: "2018",
    location: "Université de Bordeaux",
  },
];

export function Home() {
  const { theme } = useThemeContext();
  console.log(theme);
  return (
    <div
      id="home"
      style={{ backgroundColor: theme.backgroundOdd }}
      className="home"
    >
      <div className="left-home">
        <div className="home-img">
          <img src={identite} alt="me" width="90%" height="90%" />
        </div>
        <h1 style={{ color: theme.basicColor }}>Ali Saleh</h1>
        <h3 style={{ color: theme.greyTitleColor }}>BTS SIO option SLAM</h3>
        <ul>
          <li>
            <FaMailBulk size={40} color={"#795548"} />
          </li>
          <li>
            <FaGithub size={40} color={"#795548"} />
          </li>
          <li>
            <FaLinkedin size={40} color={"#795548"} />
          </li>
        </ul>
      </div>
      <div className="right-home">
        <h1 style={{ color: theme.greyTitleColor }}>Biographie</h1>
        <p style={{ color: theme.basicColor }}>
          Je suis Saleh Ali, étudiant en deuxième année de BTS SIO (Services
          Informatiques aux Organisations), Option SLAM (Solutions Logicielles
          et Application Métier) l'option spécialisée pour le développement à
          l'école d'ingenierie informatique Epsi de Bordeaux
        </p>
        <p style={{ color: theme.basicColor }}>
          J'ai un parcours assez atypique car en effet après l'obtention de mon
          baccalauréat je me suis dirigé vers une licence de mathématique ou je
          suis suis arrivé en licence 3 avant d'arrêter, car je ne me plaisais
          pas dans mes etudes ,pour rentrer dans le monde proffesionnel, pendant
          Deux avants avenat de reprendre les etudes en informatqieu a l'ecolde
          d'ingenierie ESI de Bordeaux.
        </p>
        <p style={{ color: theme.basicColor }}>
          Mon projet professionnel est de poursuivre mes trois porchaines années
          études après l'obtention de mon BTS en alternance eventuellment en
          developpement Web , afin d'acqueir l'experience necessaire a mon
          entrée dans le monde proffesionel
        </p>
        <div className="interest">
          <div className="interest-left">
            <h3 style={{ color: theme.greyTitleColor }}>Interêts</h3>
            <ul style={{ color: theme.basicColor }}>
              {interests.map((interest, index) => (
                <li key={index}>{interest.title} </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: theme.greyTitleColor }}>Etudes</h3>
            <ul className="interest-ul" style={{ color: theme.basicColor }}>
              {Educations.map((educ, index) => (
                <li key={index}>
                  <span>
                    <FaGraduationCap size={30} />
                  </span>
                  <div className="interest-lis">
                    <div className="up-li">{educ.title}</div>
                    <p
                      style={{ color: theme.date }}
                      style={{ color: theme.date }}
                    >
                      {" "}
                      {educ.beginDate} - {educ.endDate}
                    </p>
                    <div style={{ color: theme.date }} className="down-li">
                      {educ.location}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
