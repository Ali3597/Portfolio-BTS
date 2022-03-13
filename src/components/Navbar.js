import "./Navbar.css";
import { FaPalette } from "react-icons/fa";
import { useThemeContext } from "../hooks/useThemeContext";

export function Navbar({ sticky }) {
  const { setTheme } = useThemeContext();
  return (
    <nav className="navbar">
      <div className="container">
        <div className="name">ALI SALEH</div>
        <div className="anchor">
          <ul>
            <li>Home</li>
            <li>Skills</li>
            <li>Experience</li>

            <li>Projects</li>
            <li>Resume</li>
            <li>Contact</li>
            <li>
              <FaPalette onClick={setTheme} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
