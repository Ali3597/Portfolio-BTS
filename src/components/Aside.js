import "./Aside.css";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

import { Link } from "react-scroll";
import { useEffect, useState } from "react";
export const Aside = ({ isOpened }) => {
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
            <a href={cv} target="_blank">
              Cv
            </a>
          </li>
          <li>
            <a href={synthese} target="_blank">
              Synthese de competences
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
