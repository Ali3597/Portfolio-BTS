import "./IconLink.css";


export function Link({icon,p,link}) {
  return (
    <a className="a-link" target="_blank" href={link}>
     {icon} {p}
    </a>
  );
}
