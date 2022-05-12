import './Veille.css'
import { useThemeContext } from '../../hooks/useThemeContext'
import { Link } from '../../components/IconLink'
import { FaProjectDiagram } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa";
import { useCollection } from '../../hooks/useCollection';




export function Veille() {
    const { theme } = useThemeContext()
    const  { documents: veilles } = useCollection("veilles")
    return <div id="veille"  style={{ backgroundColor: theme.backgroundEven }} className=" block">
        <div className="left"><h1 style={{ color: theme.greyTitleColor }}>Veille</h1></div>
        <div className="right">
            <h1 style={{ color: theme.greyTitleColor }}>L'objectif d'une veille technologique ?</h1>
            <p style={{ color: theme.basicColor }}>De nos jours, il est très difficile d'acquérir des connaissances de manière efficace. L'objectif d'une
veille technologique est de recueillir des informations et d'identifier les opportunités qui pourraient affecter la croissance
croissance future d'une industrie. Elle est généralement effectuée dans un cadre professionnel afin d'effectuer une planification stratégique en tenant compte de la situation actuelle.
planification stratégique en tenant compte de la situation actuelle, mais elle peut également être effectuée à un niveau plus personnel.
Pour exercer cette compétence importante, nous avons travaillé en équipe pour établir un système qui nous aidera dans nos recherches futures.
dans nos futures recherches.</p>
            {veilles && veilles.map((veille,index) => (
                <div className="oneVeille" key={index}>
                    <h3 style={{ color: theme.basicColor }}>Sujet de ma veille  {" "}     : {"     "} {veille.title}</h3>
                    <p style={{ color: theme.basicColor }}>{veille.message}</p>
                    <div className="link-veille">
                        {veille.doc && <Link
                            icon={<FaProjectDiagram size={40} />}
                            p={"Veille"}
                            psize={14}
                            link={veille.doc}
                        />}
                         {veille.product && <Link
                            icon={<FaPaperclip size={40} />}
                            p={"Produit de la veille"}
                            psize={14}
                            link={veille.product}
                        />}
                    </div>
                </div>
            ))}
        </div>
    </div>
}