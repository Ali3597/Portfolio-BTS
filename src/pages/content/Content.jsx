import './Content.css'
import { Home } from '../home/Home'
import { Experience } from '../experience/Experience'
import { Project } from '../project/Project'
import { Contact } from '../contact/Contact'
import { Skills } from '../skills/Skills'
import { Veille } from '../veille/Veille'

export function Content({admin}){
    return <div className="content">
        <Home admin={admin} />
        <Skills admin={admin}  />
        <Experience admin={admin}  />
        <Veille admin={admin}  />
        <Project admin={admin}  />
        <Contact admin={admin}  />
    </div>
}