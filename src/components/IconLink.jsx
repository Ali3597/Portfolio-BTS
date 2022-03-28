import "./IconLink.css";


export function Link({icon,p,link,psize}) {
  return (
    <a style={{ fontSize:`${psize}px`}} className="a-link" target="_blank" href={link}>
     {icon} {p}
    </a>
  );
}
