import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";
import { Modal } from "../../components/Modal";
import { errorsVerification, errorFor } from "../../utils/Verification";
export const ExperienceAdmin = ({ experience }) => {
  console.log(experience.technos);
  const [errors, setErrors] = useState([]);
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
    setErrors([]);
    console.log("on verifie");
    const verificationArray = [
      { field: "company", content: company, min: 5, exist: true },
      { field: "details", content: details, min: 5, exist: true },
      { field: "start", content: start, exist: true },
      { field: "location", content: location, min: 5, exist: true },
      { field: "project", content: project, min: 5, exist: true },
      { field: "projectLink", content: projectLink, min: 5, exist: true },
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length == 0) {
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
      <Field
        name={"company"}
        value={company}
        setValue={setCompany}
        error={errorFor("company", errors)}
      >
        ENtreprise
      </Field>

      <Field
        name={"details"}
        type={"textarea"}
        value={details}
        setValue={setDetails}
        error={errorFor("details", errors)}
      >
        Details
      </Field>
      <Field
        name={"start"}
        type={"date"}
        value={start}
        setValue={setStart}
        error={errorFor("start", errors)}
      >
        Début
      </Field>
      <Field name={"end"} type={"date"} value={end} setValue={setEnd}>
        Fin
      </Field>
      <Field
        name={"Location"}
        value={location}
        setValue={setLocation}
        error={errorFor("location", errors)}
      >
        Lieu
      </Field>
      <Field
        name={"project"}
        value={project}
        setValue={setProject}
        error={errorFor("project", errors)}
      >
        Nom du projet
      </Field>
      <Field
        name={"projectLink"}
        value={projectLink}
        setValue={setProjectLink}
        error={errorFor("projectLink", errors)}
      >
        Lien du projet
      </Field>
      <h4> les Technos </h4>
      <Technos technos={technos} setTechnos={setTechnos} />
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

const Technos = ({ technos, setTechnos }) => {
  const addTechno = () => {
    if (technos) {
      setTechnos((currentTechnos) => [...currentTechnos, ""]);
    } else {
      setTechnos([""]);
    }
  };
  const handleRemoveTechno = (index) => {
    setTechnos((currentTechnos) => [
      ...currentTechnos.slice(0, index),
      ...currentTechnos.slice(index + 1),
    ]);
  };
  return (
    <>
      {!technos && <p> aucune techno </p>}
      {technos &&
        technos.map((tec, index) => (
          <div key={index}>
            <input
              value={tec}
              onChange={(e) => {
                const value = e.target.value;
                const indexFirst = index;
                setTechnos((currentTechnos) =>
                  currentTechnos.map((t, index) =>
                    index == indexFirst ? value : t
                  )
                );
              }}
            />

            <FaMinusCircle
              cursor={"pointer"}
              color={"red"}
              onClick={() => handleRemoveTechno(index)}
            />
          </div>
        ))}
      <p>Ajoutez une techno </p>
      <FaCheckCircle cursor={"pointer"} color={"green"} onClick={addTechno} />
    </>
  );
};
