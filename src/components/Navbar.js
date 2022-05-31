import "./Navbar.css";
import { FaPalette } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";

import { useThemeContext } from "../hooks/useThemeContext";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import { InputFile } from "./inputFile";
import { useLogout } from "../hooks/useLogout";
import { storage } from "../firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
export function Navbar({ user, toggleOpened }) {
  const { setTheme } = useThemeContext();
  const { logout } = useLogout();
  const imageRefCv = ref(storage, "me/cv");
  const [cv, setCv] = useState(null);
  const imageRefSynthese = ref(storage, "me/synthese");
  const [synthese, setSynthese] = useState(null);
  useEffect(async () => {
    const urlCv = await getDownloadURL(imageRefCv);
    setCv(urlCv);
    const urlSynthese = await getDownloadURL(imageRefSynthese);
    setSynthese(urlSynthese);
  }, []);
  return (
    <nav className="navbar">
      <div className="container">
        <span className="burger">
          {" "}
          <GiHamburgerMenu size={20} onClick={toggleOpened} />{" "}
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
            <li className="inputFile">
              <a href={cv} target="_blank">
                Cv
              </a>
              {user && <InputFile link={"me/cv"} setFile={setCv} />}
            </li>
            <li className="inputFile">
              <a href={synthese} target="_blank">
                Synthese des compétences
              </a>
              {user && <InputFile link={"me/synthese"} setFile={setSynthese} />}
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
