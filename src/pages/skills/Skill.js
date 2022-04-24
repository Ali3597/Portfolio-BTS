import "./Skills.css";
import { FaNodeJs } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { FaChalkboard } from "react-icons/fa";
import { SiCsharp } from "react-icons/si";

export function Skill({ skill, theme }) {
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

  return (
    <div className="skill">
      <span>{findSVG(skill.title)}</span>
      <h2 style={{ color: theme.basicColor }}> {skill.title}</h2>
      {skill.details && (
        <p style={{ color: theme.basicColor }}>{skill.details}</p>
      )}
    </div>
  );
}
