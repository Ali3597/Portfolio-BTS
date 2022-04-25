import { FaGraduationCap } from "react-icons/fa";
import { useCollection } from "../../hooks/useCollection";
import { useToggle } from "../../hooks";
import { FaEdit } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Field } from "../../components/Field";
import { useFirestore } from "../../hooks/useFirestore";
import { Modal } from "../../components/Modal";
export function Studies({ theme, user }) {
  const { documents: studies } = useCollection("studies");
  const [admin, toggleAdmin] = useToggle(false);
  const [studiesAdmin, setStudiesAdmin] = useState([]);

  useEffect(() => {
    if (studies) {
      const newStudy = {
        details: null,
        end: null,
        start: null,
        title: null,
        school: null,
        location: null,
      };
      setStudiesAdmin([...studies, newStudy]);
    }
  }, [studies]);

  return (
    <div>
      <h3 style={{ color: theme.greyTitleColor }}>Etudes</h3>
      {user && <FaEdit cursor={"pointer"} onClick={toggleAdmin} />}
      <ul
        className="interest-ul ul-interest"
        style={{ color: theme.basicColor }}
      >
        {studies &&
          !admin &&
          studies.map((study) => (
            <Study key={study.id} educ={study} theme={theme} />
          ))}
        {studiesAdmin &&
          admin &&
          studiesAdmin.map((study, index) => (
            <StudyAdmin
              key={study.id ? study.id : index}
              study={study}
              theme={theme}
            />
          ))}
      </ul>
    </div>
  );
}

function Study({ educ, theme }) {
  return (
    <li>
      <span>
        <FaGraduationCap size={30} />
      </span>
      <div className="interest-lis">
        <div className="up-li">
          {educ.title} {educ.details && <span>({educ.details})</span>}
        </div>
        <p style={{ color: theme.date }} style={{ color: theme.date }}>
          {" "}
          {educ.start
            .toDate()
            .toLocaleDateString("fr", { month: "short", year: "numeric" })}{" "}
          -{" "}
          {educ.end
            ? educ.end
                .toDate()
                .toLocaleDateString("fr", { month: "short", year: "numeric" })
            : "En cours"}
        </p>
        <div style={{ color: theme.date }} className="down-li">
          {educ.location} , {educ.school && <span>{educ.school} </span>}
        </div>
      </div>
    </li>
  );
}

function StudyAdmin({ study }) {
  console.log(study, "dezfijzeoidjeùpzjfcôiejfôi");
  const [details, setDetails] = useState(study.details);
  const [end, setEnd] = useState(study.end);
  const [start, setStart] = useState(study.start);
  const [title, setTitle] = useState(study.title);
  const [school, setSchool] = useState(study.school);
  const [location, setLocation] = useState(study.location);
  const [newProject, setNewProject] = useState(true);
  const { addDocument, updateDocument, deleteDocument, response } =
    useFirestore("studies");
  const [deleting, toggleDeleting] = useToggle(false);

  useEffect(() => {
    if (study.id) {
      setNewProject(false);
    }
  }, [study.id]);

  const handleValid = async () => {
    if (newProject) {
      await addDocument({ details, end, start, title, school, location });
    } else {
      await updateDocument(study.id, {
        details,
        end,
        start,
        title,
        school,
        location,
      });
    }
  };

  const handleDelete = async () => {
    await deleteDocument(study.id);
    toggleDeleting();
  };

  return (
    <>
      <Field name={"Titre"} value={title} setValue={setTitle}>
        Titre
      </Field>
      <Field name={"Location"} value={location} setValue={setLocation}>
        Localisation
      </Field>
      <Field name={"School"} value={school} setValue={setSchool}>
        Ecole
      </Field>
      <Field
        name={"Details"}
        type={"textarea"}
        value={details}
        setValue={setDetails}
      >
        Details
      </Field>
      <Field name={"start"} type={"date"} value={start} setValue={setStart}>
        Date de début
      </Field>
      <Field name={"end"} type={"date"} value={end} setValue={setEnd}>
        Date de fin
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
            "Etes vous sure de votre choix , ces etudes seront supprimé a jamais ?"
          }
          onClick={handleDelete}
          buttonMessage={"Supprimer"}
        />
      )}
    </>
  );
}
