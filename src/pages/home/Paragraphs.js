import { useCollection } from "../../hooks/useCollection";
import { useToggle } from "../../hooks";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { Modal } from "../../components/Modal";
import { errorsVerification, errorFor } from "../../utils/Verification";

export function Paragraphs({ theme, user }) {
  const { documents: homeParagraphes } = useCollection("homeParagraphes");
  const [admin, toggleAdmin] = useToggle(false);
  const [parasAdmin, setParasAdmin] = useState([]);

  useEffect(() => {
    if (homeParagraphes) {
      const newPara = { details: null };
      setParasAdmin([...homeParagraphes, newPara]);
    }
  }, [homeParagraphes]);

  return (
    <>
      <h1 style={{ color: theme.greyTitleColor }}>Biographie</h1>
      {user && <FaEdit cursor={"pointer"} onClick={toggleAdmin} />}
      {homeParagraphes && !admin && (
        <div className="home-paras">
          {homeParagraphes.map((para) => (
            <Paragraph key={para.id} para={para} theme={theme} />
          ))}
        </div>
      )}
      {parasAdmin &&
        admin &&
        parasAdmin.map((para, index) => (
          <ParagraphAdmin key={para.id ? para.id : index} para={para} />
        ))}
    </>
  );
}

function Paragraph({ para, theme }) {
  return <p style={{ color: theme.basicColor }}>{para.details}</p>;
}

function ParagraphAdmin({ para }) {
  const [details, setDetails] = useState(para.details ? para.details : "");
  const [errors, setErrors] = useState([]);
  const [newProject, setNewProject] = useState(true);
  const [deleting, toggleDeleting] = useToggle(false);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("homeParagraphes");
  useEffect(() => {
    if (para.id) {
      setNewProject(false);
    }
  }, [para.id]);

  const handleValid = async () => {
    setErrors([]);
    console.log("on verifie");
    const verificationArray = [
      { field: "details", content: details, min: 50, exist: true },
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length == 0) {
      if (newProject) {
        await addDocument({ details });
      } else {
        await updateDocument(para.id, {
          details,
        });
      }
    }
  };

  const handleDelete = async () => {
    await deleteDocument(para.id);
    toggleDeleting();
  };
  return (
    <>
      <Field
        name={"Details"}
        type={"textarea"}
        value={details}
        setValue={setDetails}
        error={errorFor("details", errors)}
      >
        Details
      </Field>
      <div className={"admin-buttons"}>
        <FaCheckCircle
          onClick={handleValid}
          color={"green"}
          cursor={"pointer"}
        />
        {!newProject && (
          <FaMinusCircle
            onClick={toggleDeleting}
            color={"red"}
            cursor={"pointer"}
          />
        )}
      </div>
      {!newProject && deleting && (
        <Modal
          onClose={toggleDeleting}
          title={"Supprimer"}
          message={
            "Etes vous sure de votre choix , ce paragraphe sera supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </>
  );
}
