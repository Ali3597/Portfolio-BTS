import { FaGraduationCap } from "react-icons/fa";
import { useCollection } from "../../hooks/useCollection";
export function Studies({ theme }) {
  const { documents: studies } = useCollection("studies");
  return (
    <div>
      <h3 style={{ color: theme.greyTitleColor }}>Etudes</h3>
      <ul className="interest-ul" style={{ color: theme.basicColor }}>
        {studies &&
          studies.map((study) => (
            <Study key={study.id} educ={study} theme={theme} />
          ))}
      </ul>
    </div>
  );
}

function Study({ educ, theme }) {
  return (
    <li>
      <span>
        <FaGraduationCap size={30} />
      </span>
      <div className="interest-lis">
        <div className="up-li">
          {educ.title} {educ.details && <span>({educ.details})</span>}
        </div>
        <p style={{ color: theme.date }} style={{ color: theme.date }}>
          {" "}
          {educ.start
            .toDate()
            .toLocaleDateString("fr", { month: "short", year: "numeric" })}{" "}
          -{" "}
          {educ.end
            ? educ.end
                .toDate()
                .toLocaleDateString("fr", { month: "short", year: "numeric" })
            : "En cours"}
        </p>
        <div style={{ color: theme.date }} className="down-li">
          {educ.location} , {educ.school && <span>{educ.school} </span>}
        </div>
      </div>
    </li>
  );
}

function StudyAdmin({ study, theme }) {
  return (
    <div>
      <h1>Study Admin</h1>
    </div>
  );
}
