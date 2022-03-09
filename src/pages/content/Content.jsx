import './Content.css'
import { Home } from '../home/Home'
import { Experience } from '../experience/Experience'
import { Project } from '../project/Project'

export function Content(){
    return <div className="content"><Home />
        <Experience />
        <Project />
    </div>
}