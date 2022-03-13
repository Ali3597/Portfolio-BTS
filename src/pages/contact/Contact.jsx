import "./Contact.css";
import { Home } from "../home/Home";
import { Experience } from "../experience/Experience";
import { Project } from "../project/Project";
import { useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
export function Contact() {
  const {theme} = useThemeContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name,email,message)
  }
  return (
    <div style={{ backgroundColor: theme.backgroundEven }}className="contact">
      <div className="contact-left">
        <h1>Contact</h1>
      </div>
      <div className="contact-right">
        <form onSubmit={handleSubmit}>
          <input value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="name" />
          <input value={email} onChange={(e) => setEmail(e.target.value)}  required type="email" placeholder="Email" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}  required placeholder="Message" />
          <button>Envoyer</button>
        </form>
      </div>
    </div>
  );
}
