import { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import { useFirestore } from "../../hooks/useFirestore";
import { Field } from "../../components/Field";
import { Modal } from "../../components/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";

export function VeilleAdmin({ veille, theme }) {
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
    if (newProject) {
      await addDocument({ doc, title, product });
    } else {
      await updateDocument(veille.id, {
        doc,
        title,
        product,
      });
    }
  };
  const handleDelete = async () => {
    await deleteDocument(veille.id);
    toggleDeleting();
  };
  return (
    <>
      <Field name={"Title"} value={title} setValue={setTitle}>
        Titre
      </Field>
      <Field name={"Doc"} value={doc} setValue={setDoc}>
        Docupment de la veille
      </Field>
      <Field name={"Product"} value={product} setValue={setProduct}>
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
