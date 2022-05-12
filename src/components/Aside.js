import "./Aside.css";

import { Link } from "react-scroll";
import Cv from "../assets/Cv.pdf";
export const Aside = ({ isOpened }) => {
  console.log(isOpened, "isopened");
  return (
    <div className={`${isOpened ? "opened" : ""} aside`}>
      <div className="tab-burger">
        <ul>
          <li>
            <Link activeClass="active" to="home" offset={-80} smooth={true}>
              Home
            </Link>
          </li>
          <li>
            <Link activeClass="active" to="skills" offset={-80} smooth={true}>
              Skills
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="experience"
              offset={-80}
              smooth={true}
            >
              Experience
            </Link>
          </li>
          <li>
            <Link activeClass="active" to="veille" offset={-80} smooth={true}>
              Veille
            </Link>
          </li>

          <li>
            <Link activeClass="active" to="projects" offset={-80} smooth={true}>
              Projects
            </Link>
          </li>

          <li>
            <Link activeClass="active" to="contact" offset={-80} smooth={true}>
              Contact
            </Link>
          </li>
          <li>
            <a href={Cv} target="_blank">
              Resume
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
