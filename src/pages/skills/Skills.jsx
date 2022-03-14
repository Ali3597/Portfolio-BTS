import './Skills.css'
import { FaNodeJs } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaDatabase} from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { useThemeContext } from '../../hooks/useThemeContext';
const skills = [
  {
    svg: <FaHtml5 size={80} color={"#795548"} />,
    title: "Html/css",
    
    },
     {
    svg: <FaNodeJs size={80} color={"#795548"} />,
    title: "Javascript",
    details:"Node.js/Express,React/React Native"
    },
    {
    svg: <FaPhp size={80} color={"#795548"} />,
    title: "Php",
    details:"Symfony"
    },
    {
    svg: <FaDatabase  size={80} color={"#795548"}/>,
    title: "Databases",
    details:"MySQL,SQL Server,MongoDB"
  },
  

];


export function Skills() {
    const {theme} = useThemeContext()
    return <div id="skills" style={{ backgroundColor: theme.backgroundEven }} className="skills">
        <h1 style={{ color: theme.greyTitleColor }}>Skills</h1>
        <div  className="skills-elements">
            {skills.map((skill,index) => (
                <div key={index} className="skill">
                    {skill.svg}
                    <h2 style={{ color: theme.basicColor }}> {skill.title}</h2>
                    <p style={{ color: theme.basicColor }}>{skill.details}</p>
                </div>
            ))}
           
        </div>
    </div>
}