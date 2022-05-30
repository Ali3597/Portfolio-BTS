import { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import { useFirestore } from "../../hooks/useFirestore";
import { Field } from "../../components/Field";
import { Modal } from "../../components/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { errorsVerification, errorFor } from "../../utils/Verification";
export function VeilleAdmin({ veille, theme }) {
  const [errors, setErrors] = useState([]);
  const [doc, setDoc] = useState(veille.doc);
  const [deleting, toggleDeleting] = useToggle(false);
  const [product, setProduct] = useState(veille.product);
  const [newProject, setNewProject] = useState(true);
  const [title, setTitle] = useState(veille.title);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("veilles");
  useEffect(() => {
    if (veille.id) {
      setNewProject(false);
    }
  }, [veille.id]);

  const handleValid = async () => {
    setErrors([]);
    console.log("on verifie");
    const verificationArray = [
      { field: "doc", content: doc, min: 5, exist: true },
      { field: "title", content: title, min: 5, exist: true },
      { field: "product", content: product, min: 5, exist: true },
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length == 0) {
      if (newProject) {
        await addDocument({ doc, title, product });
      } else {
        await updateDocument(veille.id, {
          doc,
          title,
          product,
        });
      }
    }
  };
  const handleDelete = async () => {
    await deleteDocument(veille.id);
    toggleDeleting();
  };
  return (
    <>
      <Field
        name={"Title"}
        value={title}
        setValue={setTitle}
        error={errorFor("title", errors)}
      >
        Titre
      </Field>
      <Field
        name={"Doc"}
        value={doc}
        setValue={setDoc}
        error={errorFor("doc", errors)}
      >
        Docupment de la veille
      </Field>
      <Field
        name={"Product"}
        value={product}
        setValue={setProduct}
        error={errorFor("product", errors)}
      >
        Produit de la veille
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
            "Etes vous sure de votre choix , cette veille sera supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </>
  );
}
