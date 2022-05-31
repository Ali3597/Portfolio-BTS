import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { useToggle } from "../../hooks";
import { Modal } from "../../components/Modal";
import { errorsVerification, errorFor } from "../../utils/Verification";
import { InputFile } from "../../components/inputFile";
export const ExperienceAdmin = ({ experience }) => {
  const [errors, setErrors] = useState([]);
  const [detailsList, setDetailsList] = useState(experience.detailsList);
  const [deleting, toggleDeleting] = useToggle(false);
  const [active, setActive] = useState(experience.active);
  const [attestation, setAttestation] = useState(experience.attestation);
  const [report, setReport] = useState(experience.report);
  const [company, setCompany] = useState(experience.company);
  const [details, setDetails] = useState(experience.details);
  const [start, setStart] = useState(experience.start);
  const [end, setEnd] = useState(experience.end);
  const [changeAttestation, setChangeAttestation] = useState(null);
  const [changeReport, setChangeReport] = useState(null);
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
    ];
    const newErrors = errorsVerification(verificationArray);
    setErrors(newErrors);
    if (newErrors.length == 0) {
      console.log(detailsList);
      if (newProject) {
        await addDocument({
          active,
          company,
          details,
          detailsList,
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
          detailsList,
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

  useEffect(async () => {
    if (changeAttestation) {
      try {
        await updateDocument(experience.id, {
          attestation: changeAttestation,
        });
        setAttestation(changeAttestation);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changeAttestation]);

  useEffect(async () => {
    if (changeReport) {
      try {
        await updateDocument(experience.id, {
          report: changeReport,
        });
        setReport(changeReport);
      } catch (error) {
        console.log(error);
      }
    }
  }, [changeReport]);

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
      <DetailsList detailsList={detailsList} setDetailsList={setDetailsList} />
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
      {!newProject && (
        <>
          {" "}
          {report && <a href={report}>Lien du Rapport</a>}
          <InputFile
            link={"report/" + experience.id}
            setFile={setChangeReport}
          />{" "}
        </>
      )}
      {!newProject && (
        <>
          {" "}
          {attestation && <a href={attestation}>Lien de l'attestation</a>}
          <InputFile
            link={"attestation/" + experience.id}
            setFile={setChangeAttestation}
          />{" "}
        </>
      )}
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

const DetailsList = ({ detailsList, setDetailsList }) => {
  const addDetailsList = () => {
    if (detailsList) {
      setDetailsList((currentDetailsList) => [...currentDetailsList, ""]);
    } else {
      setDetailsList([""]);
    }
  };
  const handleRemoveDetailList = (index) => {
    setDetailsList((currentDetailsList) => [
      ...currentDetailsList.slice(0, index),
      ...currentDetailsList.slice(index + 1),
    ]);
  };
  return (
    <>
      {!detailsList && <p> aucun details </p>}
      {detailsList &&
        detailsList.map((tec, index) => (
          <div key={index}>
            <input
              value={tec}
              onChange={(e) => {
                const value = e.target.value;
                const indexFirst = index;
                setDetailsList((detailsList) =>
                  detailsList.map((t, index) =>
                    index == indexFirst ? value : t
                  )
                );
              }}
            />

            <FaMinusCircle
              cursor={"pointer"}
              color={"red"}
              onClick={() => handleRemoveDetailList(index)}
            />
          </div>
        ))}
      <p>Ajoutez un detail </p>
      <FaCheckCircle
        cursor={"pointer"}
        color={"green"}
        onClick={addDetailsList}
      />
    </>
  );
};
