import './Skills.css'
import { FaNodeJs } from "react-icons/fa";
import { FaPhp } from "react-icons/fa";
import { FaDatabase} from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { useThemeContext } from '../../hooks/useThemeContext';
const skills = [
  {
    svg: <FaHtml5 size={80} color={"brown"} />,
    title: "Html/css",
    
    },
     {
    svg: <FaNodeJs size={80} color={"brown"} />,
    title: "Javascript",
    details:"Node.js/Express,React/React Native"
    },
    {
    svg: <FaPhp size={80} color={"brown"} />,
    title: "Php",
    details:"Symfony"
    },
    {
    svg: <FaDatabase  size={80} color={"brown"}/>,
    title: "Databases",
    details:"MySQL,SQL Server,MongoDB"
  },
  

];


export function Skills() {
    const {theme} = useThemeContext()
    return <div style={{ backgroundColor: theme.backgroundEven }} className="skills">
        <h1>Skills</h1>
        <div  className="skills-elements">
            {skills.map((skill,index) => (
                <div key={index} className="skill">
                    {skill.svg}
                    <h2> {skill.title}</h2>
                    <p>{skill.details}</p>
                </div>
            ))}
           
        </div>
    </div>
}