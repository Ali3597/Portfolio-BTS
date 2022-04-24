import "./Skills.css";

import { FaEdit } from "react-icons/fa";
import { useToggle } from "../../hooks";
import { Skill } from "./Skill";
import { SkillAdmin } from "./SkillAdmin";
import { useCollection } from "../../hooks/useCollection";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

export function Skills() {
  const { theme } = useThemeContext();
  const { documents: skills } = useCollection("skills");
  const [admin, toggleAdmin] = useToggle(false);
  const [adminSkills, setAdminSkills] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (skills) {
      const newSkill = {
        title: null,
        details: null,
      };
      setAdminSkills([...skills, newSkill]);
    }
  }, [skills]);

  return (
    <div
      id="skills"
      style={{ backgroundColor: theme.backgroundEven }}
      className="skills"
    >
      <h1 style={{ color: theme.greyTitleColor }}>Skills</h1>
      {user && <FaEdit onClick={toggleAdmin} cursor={"pointer"} />}
      {!admin && (
        <div className="skills-elements">
          {skills &&
            skills.map((skill) => (
              <Skill index={skill.id} skill={skill} theme={theme} />
            ))}
        </div>
      )}
      {admin && (
        <div className={"skills-admin-elements"}>
          {adminSkills.map((skill, index) => (
            <SkillAdmin
              skill={skill}
              key={skill.id ? skill.id : index}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
}
