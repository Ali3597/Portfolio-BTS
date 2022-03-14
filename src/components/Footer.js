import "./Footer.css";
import { FaChevronUp } from "react-icons/fa";
import { useThemeContext } from "../hooks/useThemeContext";
import { Link } from "react-scroll";

export function Footer() {
  const { theme } = useThemeContext();
  return (
    <footer
      style={{ backgroundColor: theme.backgroundOdd, color: theme.basicColor }}
    >
      <p> © Ali Saleh </p>
      <Link activeClass="active" to="home" offset={-80} smooth={true}>
        <FaChevronUp cursor={"pointer"} size={30} />
      </Link>
    </footer>
  );
}
