export const Experience = ({ experience, index, allExperiences, theme }) => {
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
            {experience.end.toDate().toLocaleDateString("fr")} .{" "}
            {experience.location}
          </h5>
          <ul style={{ color: theme.basicColor }}>
            <li>
              {" "}
              <span>Details</span> : {experience.details}
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
        </div>
      </div>
    </div>
  );
};
