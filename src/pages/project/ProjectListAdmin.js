import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import "./ProjectListAdmin.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";

export function ProjectListAdmin({ project }) {
  const [deleting, toggleDeleting] = useToggle(false);
  const [details, setDetails] = useState(project.details);
  const [newProject, setNewProject] = useState(true);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("projects");
  const [githubLink, setGithubLink] = useState(project.githubLink);
  const [projectLink, setProjectLink] = useState(project.projectLink);
  const [title, setTitle] = useState(project.title);
  const [type, setType] = useState(project.type);

  useEffect(() => {
    if (project.id) {
      setNewProject(false);
    }
  }, [project.id]);

  const handleValid = async () => {
    if (newProject) {
      await addDocument({ details, githubLink, projectLink, title, type });
    } else {
      await updateDocument(project.id, {
        details,
        githubLink,
        projectLink,
        title,
        type,
      });
    }
  };
  const handleDelete = async () => {
    await deleteDocument(project.id);
    toggleDeleting();
  };

  return (
    <div className={"project-admin"}>
      <div className={"form-project-admin"}>
        <Field
          name={"Details"}
          type={"textarea"}
          value={details}
          setValue={setDetails}
        >
          Details
        </Field>
        <input value={githubLink} />
        <Field name={"Lien github"} value={githubLink} setValue={setGithubLink}>
          Lien Github
        </Field>
        <Field
          name={"Lien du projet"}
          value={projectLink}
          setValue={setProjectLink}
        >
          Lien du projet
        </Field>
        <Field name={"Titre"} value={title} setValue={setTitle}>
          Titre
        </Field>
        <Field name={"Type"} value={type} setValue={setType}>
          Type
        </Field>
      </div>
      <div className={"project-admin-buttons"}>
        {response.error}
        <FaCheckCircle
          color={"green"}
          cursor={"pointer"}
          onClick={handleValid}
        />
        {!newProject && (
          <FaMinusCircle
            color={"red"}
            cursor={"pointer"}
            onClick={toggleDeleting}
          />
        )}
      </div>
      {!newProject && deleting && (
        <Modal
          onClose={toggleDeleting}
          title={"Supprimer"}
          message={
            "Etes vous sure de votre choix , ce projet sera supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </div>
  );
}
