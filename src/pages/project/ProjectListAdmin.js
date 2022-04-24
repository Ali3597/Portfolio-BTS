import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import "./ProjectListAdmin.css";
import { FaCheckCircle } from "react-icons/fa";
import { db } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";

export function ProjectListAdmin({ project }) {
  const [details, setDetails] = useState(project ? project.details : null);
  const [newProject, setNewProject] = useState(true);
  const { addDocument, updateDocument, response } = useFirestore("projects");
  const [githubLink, setGithubLink] = useState(
    project ? project.githubLink : null
  );

  const [projectLink, setProjectLink] = useState(
    project ? project.projectLink : null
  );
  const [title, setTitle] = useState(project ? project.title : null);
  const [type, setType] = useState(project ? project.type : null);

  useEffect(() => {
    if (project.id) {
      setNewProject(false);
    }
  }, [project.id]);

  const handleValid = async () => {
    if (newProject) {
      await addDocument({ details, githubLink, projectLink, title, type });
    } else {
      console.log("on updateeeeeeeee", project.id);
      await updateDocument(project.id, {
        details,
        githubLink,
        projectLink,
        title,
        type,
      });
    }
  };

  return (
    <div className={"project-admin"}>
      <div className={"form-project-admin"}>
        <Field
          name={"Details"}
          type={"textarea"}
          value={details}
          setValue={setDetails}
        />
        <Field
          name={"Lien github"}
          value={githubLink}
          setValue={setGithubLink}
        />
        <Field
          name={"Lien du projet"}
          value={projectLink}
          setValue={setProjectLink}
        />
        <Field name={"Titre"} value={title} setValue={setTitle} />
        <Field name={"Type"} value={type} setValue={setType} />
        <h3>{newProject ? "new" : "not new"}</h3>
      </div>
      <div>
        <FaCheckCircle
          size={50}
          color={"green"}
          cursor={"pointer"}
          onClick={handleValid}
        />
        {response.error && <h1>{response.error}</h1>}
      </div>
    </div>
  );
}
