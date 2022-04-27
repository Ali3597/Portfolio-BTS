import './Content.css'
import { Home } from '../home/Home'
import { Experiences } from '../experience/Experiences'
import { Project } from '../project/Project'
import { Contact } from '../contact/Contact'
import { Skills } from '../skills/Skills'
import { Veille } from '../veille/Veille'

export function Content(){
    return <div className="content">
        <Home  />
        <Skills   />
        <Experiences   />
        <Veille   />
        <Project   />
        <Contact   />
    </div>
}