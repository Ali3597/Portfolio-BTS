import "./Contact.css";
import { useState } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
export function Contact() {
  const {theme} = useThemeContext()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [success,setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess(false)
    setEmail('')
    setName('')
    setMessage('')
    setSuccess(true)
  }
  return (
    <div style={{ backgroundColor: theme.backgroundEven }} id="contact" className="block">
      <div className="contact-left left">
        <h1 style={{ color: theme.greyTitleColor }}>Contact</h1>
      </div>
      <div className="contact-right right">
        <form onSubmit={handleSubmit}>
          <input style={{color: theme.greyTitleColor, backgroundColor: theme.inputBackground }} value={name} onChange={(e) => setName(e.target.value)} required type="text" placeholder="Nom" />
          
          <input style={{ color: theme.greyTitleColor, backgroundColor: theme.inputBackground }} value={email} onChange={(e) => setEmail(e.target.value)}  required type="email" placeholder="Email" />
          <textarea style={{ color: theme.greyTitleColor, backgroundColor: theme.inputBackground }} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Message" />
          {success && <p className="success-contact"> Votre message a bien éte envoyé  </p>}
          <button>Envoyer</button>
        </form>
      </div>
    </div>
  );
}
