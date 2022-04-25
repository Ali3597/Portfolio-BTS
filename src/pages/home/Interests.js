import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Field } from "../../components/Field";
import { FaEdit } from "react-icons/fa";
import { useToggle } from "../../hooks";
import { useFirestore } from "../../hooks/useFirestore";
import { Modal } from "../../components/Modal";

export function Interests({ theme, user }) {
  const { documents: interests } = useCollection("interests");
  const [admin, toggleAdmin] = useToggle(false);
  const [adminInterests, setAdminInterests] = useState([]);

  useEffect(() => {
    if (interests) {
      const newInterest = { title: null };
      setAdminInterests([...interests, newInterest]);
    }
  }, [interests]);

  return (
    <div className="interest-left">
      <h3 style={{ color: theme.greyTitleColor }}>Interêts</h3>
      {user && <FaEdit cursor={"pointer"} onClick={toggleAdmin} />}
      <ul className={"ul-interest"} style={{ color: theme.basicColor }}>
        {interests &&
          !admin &&
          interests.map((inte) => <Interest interest={inte} key={inte.id} />)}

        {adminInterests &&
          admin &&
          adminInterests.map((inte) => (
            <InterestAdmin interest={inte} key={inte.id} />
          ))}
      </ul>
    </div>
  );
}

function Interest({ interest }) {
  return <li>{interest.title} </li>;
}

function InterestAdmin({ interest }) {
  const [title, setTitle] = useState(interest.title);
  const [newProject, setNewProject] = useState(true);
  const [deleting, toggleDeleting] = useToggle(false);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("skills");

  useEffect(() => {
    if (interest.id) {
      setNewProject(false);
    }
  }, [interest.id]);

  const handleValid = async () => {
    if (newProject) {
      await addDocument({ title });
    } else {
      await updateDocument(interest.id, {
        title,
      });
    }
  };

  const handleDelete = async () => {
    await deleteDocument(interest.id);
    toggleDeleting();
  };

  return (
    <>
      <Field name={"Titre"} value={title} setValue={setTitle}>
        Titre
      </Field>
      <div className={"admin-buttons"}>
        <FaCheckCircle
          onClick={handleValid}
          color={"green"}
          cursor={"pointer"}
        />
        <FaMinusCircle
          onClick={toggleDeleting}
          color={"red"}
          cursor={"pointer"}
        />
      </div>
      {!newProject && deleting && (
        <Modal
          onClose={toggleDeleting}
          title={"Supprimer"}
          message={
            "Etes vous sure de votre choix , cet interet sera supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </>
  );
}
