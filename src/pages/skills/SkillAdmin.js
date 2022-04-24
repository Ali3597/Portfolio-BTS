import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";
import { Modal } from "../../components/Modal";

export function SkillAdmin({ skill, theme }) {
  const [deleting, toggleDeleting] = useToggle(false);
  const [details, setDetails] = useState(skill.details);
  const [title, setTitle] = useState(skill.title);
  const [newProject, setNewProject] = useState(true);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("skills");
  const handleValid = async () => {
    if (newProject) {
      await addDocument({ details, title });
    } else {
      await updateDocument(skill.id, {
        details,
        title,
      });
    }
  };

  useEffect(() => {
    if (skill.id) {
      setNewProject(false);
    }
  }, [skill.id]);

  const handleDelete = async () => {
    await deleteDocument(skill.id);
    toggleDeleting();
  };
  return (
    <div className={"skill-admin"}>
      <Field
        name={"Details"}
        type={"textarea"}
        value={details}
        setValue={setDetails}
      >
        Details
      </Field>
      <Field name={"Titre"} value={title} setValue={setTitle}>
        Titre
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
}
