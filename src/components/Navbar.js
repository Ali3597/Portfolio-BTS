import "./Navbar.css";
import { FaPalette } from "react-icons/fa";

export function Navbar({ sticky }) {
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
              <FaPalette />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
