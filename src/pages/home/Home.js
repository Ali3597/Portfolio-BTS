import "./Home.css";
import identite from "../../assets/identite.jpg";
import { FaGraduationCap } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useCollection } from "../../hooks/useCollection";
import { useEffect } from "react";

export function Home({ admin }) {
  const { theme } = useThemeContext();
  const { documents: interests } = useCollection("interests");
  const { documents: studies } = useCollection("studies");
  const { documents: homeParagraphes } = useCollection("homeParagraphes");
  useEffect(() => {
    if (homeParagraphes) {
      console.log(homeParagraphes, "zzzz");
    }
  }, [homeParagraphes]);

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
        {homeParagraphes &&
          homeParagraphes.map((para) => (
            <p key={para.id} style={{ color: theme.basicColor }}>
              {para.details}
            </p>
          ))}

        <div className="interest">
          <div className="interest-left">
            <h3 style={{ color: theme.greyTitleColor }}>Interêts</h3>
            <ul style={{ color: theme.basicColor }}>
              {interests &&
                interests.map((interest, index) => (
                  <li key={index}>{interest.title} </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: theme.greyTitleColor }}>Etudes</h3>
            <ul className="interest-ul" style={{ color: theme.basicColor }}>
              {studies &&
                studies.map((educ, index) => (
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
                        {educ.start.toDate().toLocaleDateString("fr")} -{" "}
                        {educ.end
                          ? educ.end.toDate().toLocaleDateString("fr")
                          : "En cours"}
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
