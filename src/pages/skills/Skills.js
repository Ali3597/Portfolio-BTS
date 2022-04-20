import "./Skills.css";
import { FaNodeJs } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaChalkboard } from "react-icons/fa";

import { SiCsharp } from "react-icons/si";

import { useCollection } from "../../hooks/useCollection";

import { useThemeContext } from "../../hooks/useThemeContext";
import { useEffect, useState } from "react";

export function Skills() {
  const { theme } = useThemeContext();
  const { documents: skills } = useCollection("skills");
  const [parsedSkills, setParsedSkills] = useState(null);

  const findSVG = (title) => {
    switch (title) {
      case "Javascript":
        return <FaNodeJs size={40} color={"#795548"} />;
      case "Python":
        return <FaPython size={40} color={"#795548"} />;
      case "Html/Css":
        return <FaHtml5 size={40} color={"#795548"} />;
      case "PHP":
        return <FaPhp size={40} color={"#795548"} />;
      case "Databases":
        return <FaDatabase size={40} color={"#795548"} />;
      case "C#":
        return <SiCsharp size={40} color={"#795548"} />;
      default:
        return <FaChalkboard size={40} color={"#795548"} />;
    }
  };

  useEffect(() => {
    if (skills) {
      let finalSkillArray = [];
      skills.map((skill) => {
        finalSkillArray.push({ ...skill, svg: findSVG(skill.title) });
      });
      setParsedSkills(finalSkillArray);
    }
  }, [skills]);
  return (
    <div
      id="skills"
      style={{ backgroundColor: theme.backgroundEven }}
      className="skills"
    >
      <h1 style={{ color: theme.greyTitleColor }}>Skills</h1>
      <div className="skills-elements">
        {parsedSkills &&
          parsedSkills.map((skill, index) => (
            <div key={index} className="skill">
              <span>{skill.svg}</span>
              <h2 style={{ color: theme.basicColor }}> {skill.title}</h2>
              {skill.details && (
                <p style={{ color: theme.basicColor }}>{skill.details}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
