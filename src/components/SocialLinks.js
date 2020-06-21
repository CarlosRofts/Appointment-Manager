import React from 'react'
// import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons'
import { faGithub} from '@fortawesome/free-brands-svg-icons'  
   



const portfolio = <FontAwesomeIcon icon={faUserCircle} className="social ml-2 mr-1 display-4"/>
const gitHub2 = <FontAwesomeIcon icon={faGithub} className="social mr-2 display-4" />

const SocialLinks = () => {
    return (
      <div className="d-flex rounded-pill my-3 py-2" style={{ position:"fixed",right:30,bottom:0,zIndex:100}}>
          <a target="_blank" rel="noopener noreferrer" className="text-white my-auto" href="http://carlosfuentes.ns1.epizy.com/">{portfolio}</a>
          <a target="_blank" rel="noopener noreferrer" className="text-white my-auto" href="https://github.com/CarlosRofts/Appointment-Manager">{gitHub2}</a>
      </div>      
      );
}
 
export default SocialLinks;