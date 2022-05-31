import { FaLink } from "react-icons/fa";

import { Link } from "../../components/IconLink";
import { HiOutlineDocumentSearch } from "react-icons/hi";

export const Experience = ({ experience, index, allExperiences, theme }) => {
  if (experience.start) {
    console.log(experience.start, "ton start");
  }
  return (
    <div key={index}>
      <div className="bord">
        <div className={index == 0 ? "trait" : " trait trait-bord"}>
          <div> </div>
          <div> </div>
        </div>
        <div className={experience.active ? "dot active" : "dot"}> </div>
        <div
          className={
            index == allExperiences - 1 ? "trait" : " trait trait-bord"
          }
        >
          <div> </div>
          <div> </div>
        </div>
      </div>
      <div className="detail-expe">
        <div
          style={{ backgroundColor: theme.cardBackground }}
          className="card-expe"
        >
          <h1 style={{ color: theme.date }}>{experience.company}</h1>
          {experience.projectLink && (
            <a href={experience.projectLink} target="_blank">
              {experience.project}
            </a>
          )}
          <h5 style={{ color: theme.date }}>
            {experience.start.toDate().toLocaleDateString("fr")}-
            {experience.end
              ? experience.end.toDate().toLocaleDateString("fr")
              : "En cours"}{" "}
            . {experience.location}
          </h5>
          <ul style={{ color: theme.basicColor }}>
            <li>
              {" "}
              <span>Details</span> : {experience.details}
              {experience.detailsList && (
                <ul>
                  {experience.detailsList.map((t, index) => (
                    <li key={index}> {t} </li>
                  ))}
                </ul>
              )}
            </li>
            {experience.technos && (
              <li>
                {" "}
                <span>Techno</span> :{" "}
                <ul>
                  {experience.technos.map((t, index) => (
                    <li key={index}> {t} </li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
          <div className="experience-left-links">
            {experience.attestation && (
              <Link
                icon={<HiOutlineDocumentSearch size={18} />}
                p={"Code"}
                psize={11}
                link={experience.attestation}
              />
            )}
            {experience.report && (
              <Link
                icon={<FaLink size={18} />}
                p={"Project"}
                psize={11}
                link={experience.report}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
