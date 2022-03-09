export function ProjectsList({ projects }) {
  return (
    <>
      {projects &&
        projects.map((project, index) => (
          <div key={index} className="project-list">
            <div className="project-list-left">
              <h1>{project.title}</h1>
              <p>{project.details}</p>
            </div>
            <div className="project-list-right">
              <img
                src={project.photo}
                alt="project"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        ))}
    </>
  );
}
