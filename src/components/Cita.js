import React from 'react';
import PropTypes from 'prop-types'

const Cita = ({cita , eliminarCita}) => {   
  
    const toggleClass = (e) => {
        console.log(e.target)

        if(e.target.classList.contains('card-wrapper')){
            e.target.classList.toggle("expand")
        } else if(e.target.parentElement.classList.contains('card-wrapper')) { 
            e.target.parentElement.classList.toggle("expand")
        }
    }

    // ITERANDO CITAS EXISTENTES Y NUEVAS
    return ( 
        <div
         className="cita card-wrapper"
         onClick={ (e) => toggleClass(e)}
        >
            <div className="w-100 d-flex justify-content-end">
                <button
                    // className="button .eliminar  btn-warning btn w-100"
                    className="btn-warning btn" 
                    onClick={ () => eliminarCita(cita.id)}
                >
                    &times;
                </button>
                
            </div>

            <h4>Mascota: {cita.mascota}</h4>
            <h5><strong>Dueño(a):</strong>  {cita.propietario}</h5>
             <p><strong>Fecha:</strong>  {cita.fecha}</p>
             <p><strong>Hora: </strong> {cita.hora}</p>
            <p className="sintomas"><strong>Sintomas:</strong> {cita.sintomas}</p>

            
        </div>
     );
}
 

Cita.propType = {
    cita: PropTypes.object.isRequired,
    eliminarCita: PropTypes.func.isRequired
}

export default Cita;
