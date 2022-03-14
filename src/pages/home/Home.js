import "./Home.css";
import identite from "../../assets/identite.jpg";
import { FaGraduationCap } from "react-icons/fa";
import { useThemeContext } from "../../hooks/useThemeContext";

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
        <div>
          <img src={identite} alt="me" width="80%" height="80%" />
        </div>
        <h1>Ali SAleh</h1>
        <h3>Etudient en informatique</h3>
        <h4>EPSI Bordeaux</h4>
        <h5>BTS SIO option SLAM</h5>
      </div>
      <div className="right-home">
        <h1>Biographie</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets
          containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem
          Ipsum.
        </p>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </p>
        <div className="interest">
          <div>
            <h3>Interest</h3>
            <ul>
              <li>Compentence 1</li>
              <li>Compentence 2</li>
              <li>Compentence 3</li>
              <li>Compentence 4</li>
            </ul>
          </div>
          <div>
            <h3>Education</h3>
            <ul>
              <li>
                <FaGraduationCap />
                Etudes 1
              </li>
              <li>
                <FaGraduationCap />
                Etudes 2
              </li>
              <li>
                <FaGraduationCap />
                Etudes 3
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
