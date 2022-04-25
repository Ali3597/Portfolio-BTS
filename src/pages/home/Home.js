import "./Home.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { Interests } from "./Interests";
import { Studies } from "./Studies";
import { Paragraphs } from "./Paragraphs";
import { Profile } from "./Profile";
import { useAuthContext } from "../../hooks/useAuthContext";

export function Home() {
  const { theme } = useThemeContext();
  const { user } = useAuthContext();
  return (
    <div
      id="home"
      style={{ backgroundColor: theme.backgroundOdd }}
      className="home"
    >
      <div className="left-home">
        <Profile theme={theme} user={user} />
      </div>
      <div className="right-home">
        <Paragraphs theme={theme} user={user} />

        <div className="interest">
          <Interests theme={theme} user={user} />
          <Studies theme={theme} user={user} />
        </div>
      </div>
    </div>
  );
}
