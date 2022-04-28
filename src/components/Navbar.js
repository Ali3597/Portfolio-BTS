import "./Navbar.css";
import { FaPalette } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import { useThemeContext } from "../hooks/useThemeContext";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";

import { useLogout } from "../hooks/useLogout";
import Cv from "../assets/Cv.pdf";

export function Navbar({ user }) {
  const { setTheme } = useThemeContext();
  const { logout } = useLogout();

  return (
    <nav className="navbar">
      <div className="container">
        <span className="burger">
          {" "}
          <GiHamburgerMenu size={20} />{" "}
        </span>
        <div className="name">ALI SALEH</div>

        <div className="anchor">
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
              <Link
                activeClass="active"
                to="projects"
                offset={-80}
                smooth={true}
              >
                Projects
              </Link>
            </li>

            <li>
              <Link
                activeClass="active"
                to="contact"
                offset={-80}
                smooth={true}
              >
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
        <span className="palette">
          {!user && (
            <FaPalette size={15} cursor={"pointer"} onClick={setTheme} />
          )}
          {user && (
            <FaSignOutAlt size={15} cursor={"pointer"} onClick={logout} />
          )}
        </span>
      </div>
    </nav>
  );
}
