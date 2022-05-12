import "./Veille.css";
import { useThemeContext } from "../../hooks/useThemeContext";
import { Link } from "../../components/IconLink";
import { FaProjectDiagram } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { useCollection } from "../../hooks/useCollection";
import { FaEdit } from "react-icons/fa";
import { useToggle } from "../../hooks";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Veille } from "./Veille";
import { VeilleAdmin } from "./VeilleAdmin";
import { useEffect, useState } from "react";

export function Veilles() {
  const { theme } = useThemeContext();
  const { documents: veilles } = useCollection("veilles");
  const { user } = useAuthContext();
  const [admin, toggleAdmin] = useToggle(false);
  const [veillesAdmin, SetVeillesAdmin] = useState([]);
  useEffect(() => {
    if (veilles) {
      const newVeille = { title: null, doc: null, product: null };
      SetVeillesAdmin([...veilles, newVeille]);
    }
  }, [veilles]);
  return (
    <div
      id="veille"
      style={{ backgroundColor: theme.backgroundEven }}
      className=" block"
    >
      <div className="left">
        <h1 style={{ color: theme.greyTitleColor }}>Veille</h1>
      </div>
      <div className="right">
        <h1 style={{ color: theme.greyTitleColor }}>
          L'objectif d'une veille technologique ?
        </h1>
        <p style={{ color: theme.basicColor }}>
          De nos jours, il est très difficile d'acquérir des connaissances de
          manière efficace. L'objectif d'une veille technologique est de
          recueillir des informations et d'identifier les opportunités qui
          pourraient affecter la croissance croissance future d'une industrie.
          Elle est généralement effectuée dans un cadre professionnel afin
          d'effectuer une planification stratégique en tenant compte de la
          situation actuelle. planification stratégique en tenant compte de la
          situation actuelle, mais elle peut également être effectuée à un
          niveau plus personnel. Pour exercer cette compétence importante, nous
          avons travaillé en équipe pour établir un système qui nous aidera dans
          nos recherches futures. dans nos futures recherches.
        </p>
        {user && <FaEdit cursor={"pointer"} onClick={toggleAdmin} />}
        {veilles &&
          !admin &&
          veilles.map((veille) => (
            <Veille key={veille.id} theme={theme} veille={veille} />
          ))}
        {veillesAdmin &&
          admin &&
          veillesAdmin.map((veille, index) => (
            <VeilleAdmin key={veille.id ? veille.id : index} veille={veille} />
          ))}
      </div>
    </div>
  );
}
