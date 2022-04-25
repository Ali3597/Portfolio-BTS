import { useCollection } from "../../hooks/useCollection";

export function Paragraphs({ theme }) {
  const { documents: homeParagraphes } = useCollection("homeParagraphes");
  return (
    <>
      <h1 style={{ color: theme.greyTitleColor }}>Biographie</h1>
      {homeParagraphes &&
        homeParagraphes.map((para) => (
          <Paragraph key={para.id} para={para} theme={theme} />
        ))}
    </>
  );
}

function Paragraph({ para, theme }) {
  return <p style={{ color: theme.basicColor }}>{para.details}</p>;
}

function ParagraphAdmin({ paragraphe, theme }) {
  return (
    <div>
      <h1>Paragraphe Admin</h1>
    </div>
  );
}
