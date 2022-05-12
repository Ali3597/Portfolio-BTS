import { FaProjectDiagram } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { Link } from "../../components/IconLink";

export function Veille({ veille, theme }) {
  return (
    <div className="oneVeille">
      <h3 style={{ color: theme.basicColor }}>
        Sujet de ma veille : {"     "} {veille.title}
      </h3>
      <p style={{ color: theme.basicColor }}>{veille.message}</p>
      <div className="link-veille">
        {veille.doc && (
          <Link
            icon={<FaProjectDiagram size={40} />}
            p={"Veille"}
            psize={14}
            link={veille.doc}
          />
        )}
        {veille.product && (
          <Link
            icon={<FaPaperclip size={40} />}
            p={"Produit de la veille"}
            psize={14}
            link={veille.product}
          />
        )}
      </div>
    </div>
  );
}
