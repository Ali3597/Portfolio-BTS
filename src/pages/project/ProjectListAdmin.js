import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import "./ProjectListAdmin.css";
import projectDefault from "../../assets/project.png";
import { InputFile } from "../../components/inputFile";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Modal } from "../../components/Modal";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";
import { errorsVerification, errorFor } from "../../utils/Verification";

export function ProjectListAdmin({ project }) {
  const [errors, setErrors] = useState([]);
  const [deleting, toggleDeleting] = useToggle(false);
  const [details, setDetails] = useState(project.details);
  const [photo, setPhoto] = useState(project.photo);
  const [resume, setResume] = useState(project.resume);
  const [changeResume, setChangeResume] = useState(null);
  const [changePhoto, setChangePhoto] = useState(null);
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
    setErrors([]);
    console.log("on verifie");
    const verificationArray = [
      { field: "details", content: details, min: 5, exist: true },
      { field: "githubLink", content: githubLink, min: 5, exist: true },
      { field: "projectLink", content: projectLink, min: 5, exist: true },
      { field: "title", content: title, min: 5, exist: true },
      { field: "type", content: type, min: 5, exist: true },
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length == 0) {
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
    }
  };
  const handleDelete = async () => {
    await deleteDocument(project.id);
    toggleDeleting();
  };
  useEffect(async () => {
    if (changePhoto) {
      try {
        await updateDocument(project.id, {
          photo: changePhoto,
        });
        setPhoto(changePhoto);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changePhoto]);

  useEffect(async () => {
    if (changeResume) {
      try {
        await updateDocument(project.id, {
          resume: changeResume,
        });
        setResume(changeResume);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changeResume]);
  return (
    <div className={"project-admin"}>
      <div className={"form-project-admin"}>
        {!newProject && (
          <>
            {" "}
            <img src={photo ? photo : projectDefault} />{" "}
            <InputFile
              link={"projects/" + project.id}
              setFile={setChangePhoto}
            />{" "}
          </>
        )}
        <Field
          name={"Details"}
          type={"textarea"}
          value={details}
          setValue={setDetails}
          error={errorFor("details", errors)}
        >
          Details
        </Field>
        <input value={githubLink} />
        <Field
          name={"Lien github"}
          value={githubLink}
          setValue={setGithubLink}
          error={errorFor("githubLink", errors)}
        >
          Lien Github
        </Field>
        <Field
          name={"Lien du projet"}
          value={projectLink}
          setValue={setProjectLink}
          error={errorFor("projectLink", errors)}
        >
          Lien du projet
        </Field>
        <Field
          name={"Titre"}
          value={title}
          setValue={setTitle}
          error={errorFor("title", errors)}
        >
          Titre
        </Field>
        <Field
          name={"Type"}
          value={type}
          setValue={setType}
          error={errorFor("type", errors)}
        >
          Type
        </Field>
        {!newProject && (
          <>
            {" "}
            {resume && <a href={resume}>Lien du Resume</a>}
            <InputFile
              link={"resumeprojects/" + project.id}
              setFile={setChangeResume}
            />{" "}
          </>
        )}
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
