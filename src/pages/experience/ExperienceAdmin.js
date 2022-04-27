import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";
import { Modal } from "../../components/Modal";

export const ExperienceAdmin = ({ experience }) => {
  const [deleting, toggleDeleting] = useToggle(false);
  const [active, setActive] = useState(experience.active);
  const [company, setCompany] = useState(experience.company);
  const [details, setDetails] = useState(experience.details);
  const [start, setStart] = useState(experience.start);
  const [end, setEnd] = useState(experience.end);
  const [location, setLocation] = useState(experience.location);
  const [project, setProject] = useState(experience.project);
  const [projectLink, setProjectLink] = useState(experience.projectLink);
  const [technos, setTechnos] = useState(experience.technos);
  const [newProject, setNewProject] = useState(true);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("experiences");

  useEffect(() => {
    if (experience.id) {
      setNewProject(false);
    }
  }, [experience.id]);

  const handleValid = async () => {
    if (newProject) {
      await addDocument({
        active,
        company,
        details,
        start,
        end,
        location,
        project,
        projectLink,
        technos,
      });
    } else {
      await updateDocument(experience.id, {
        active,
        company,
        details,
        start,
        end,
        location,
        project,
        projectLink,
        technos,
      });
    }
  };

  const handleDelete = async () => {
    await deleteDocument(experience.id);
    toggleDeleting();
  };

  return (
    <div className="admin-expe">
      <Field
        name={"active"}
        type={"checkbox"}
        value={active}
        setValue={setActive}
      >
        Travail Actuel ?
      </Field>
      <Field name={"company"} value={company} setValue={setCompany}>
        ENtreprise
      </Field>

      <Field
        name={"details"}
        type={"textarea"}
        value={details}
        setValue={setDetails}
      >
        Details
      </Field>
      <Field name={"start"} type={"date"} value={start} setValue={setStart}>
        Début
      </Field>
      <Field name={"end"} type={"date"} value={end} setValue={setEnd}>
        Fin
      </Field>
      <Field name={"Location"} value={location} setValue={setLocation}>
        Lieu
      </Field>
      <Field name={"project"} value={project} setValue={setProject}>
        Nom du projet
      </Field>
      <Field name={"projectLink"} value={projectLink} setValue={setProjectLink}>
        Lien du projet
      </Field>

      <div className={"project-admin-buttons"}>
        {response.error}
        <FaCheckCircle
          size={50}
          color={"green"}
          cursor={"pointer"}
          onClick={handleValid}
        />
        {!newProject && (
          <FaMinusCircle
            size={50}
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
};
