import { useEffect, useState } from "react";
import { useToggle } from "../../hooks";
import { useFirestore } from "../../hooks/useFirestore";
import { Field } from "../../components/Field";
import { Modal } from "../../components/Modal";
import { FaCheckCircle } from "react-icons/fa";
import { InputFile } from "../../components/inputFile";
import { FaMinusCircle } from "react-icons/fa";
import { errorsVerification, errorFor } from "../../utils/Verification";
export function VeilleAdmin({ veille, theme }) {
  const [errors, setErrors] = useState([]);
  const [doc, setDoc] = useState(veille.doc);
  const [changeDoc, setChangeDoc] = useState(null);
  const [deleting, toggleDeleting] = useToggle(false);
  const [product, setProduct] = useState(veille.product);
  const [changeProduct, setChangeProduct] = useState(null);

  const [newProject, setNewProject] = useState(true);
  const [title, setTitle] = useState(veille.title ? veille.title : "");
  const { addDocument, updateDocument, deleteDocument } =
    useFirestore("veilles");
  useEffect(() => {
    if (veille.id) {
      setNewProject(false);
    }
  }, [veille.id]);

  const handleValid = async () => {
    setErrors([]);

    const verificationArray = [
      { field: "title", content: title, min: 5, exist: true },
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length === 0) {
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

  useEffect(async () => {
    if (changeDoc) {
      try {
        await updateDocument(veille.id, {
          doc: changeDoc,
        });
        setDoc(changeDoc);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changeDoc]);

  useEffect(async () => {
    if (changeProduct) {
      try {
        await updateDocument(veille.id, {
          product: changeProduct,
        });
        setProduct(changeProduct);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changeProduct]);
  return (
    <div className="veille-admin">
      <Field
        name={"Title"}
        value={title}
        setValue={setTitle}
        error={errorFor("title", errors)}
      >
        Titre
      </Field>
      {!newProject && (
        <>
          {" "}
          {!doc && <p>Rajoutez le document de la veille</p>}
          {doc && <a href={doc}>Lien du document dela veille</a>}
          <InputFile
            link={"veilleDoc/" + veille.id}
            setFile={setChangeDoc}
          />{" "}
        </>
      )}
      {!newProject && (
        <>
          {" "}
          {!product && <p>Rajoutez le produit dela veille</p>}
          {product && <a href={product}>Lien du produit dela veille</a>}
          <InputFile
            link={"veilleProduct/" + veille.id}
            setFile={setChangeProduct}
          />{" "}
        </>
      )}

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
    </div>
  );
}
