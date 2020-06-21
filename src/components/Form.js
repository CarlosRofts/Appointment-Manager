import React , {Fragment , useState } from 'react' //emet abr. imr
import useCurrentWitdh from '../helper/listener'
const uuid = require('uuid/v4'); 

//emet abr. shortcut sfc
const Form  = ({crearCita}) => {


    let x = useCurrentWitdh().width
    let scrollWin = (x) => {
        if (x <= 700){ window.scrollBy(0, 300)}
    } 

    // ──── States 
    
    // State GETS/SETS
        // (inicia como un objet vacio)
    const [cita, actualizarCita] = useState({        
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    })

    // State para los ERRORES
    const[error, actualizarError] = useState(false)


    
// ──── Event Functions 
    // Llenar el State
        // onChange
    const actualizarState = (e) => {
        actualizarCita({
            ...cita, //copia necesaria para que llene apropiedamente el state
            [e.target.name] : e.target.value //trick!
        })
    }
    // Destructuring a los valores (acorta el poner objeto.key)
    const {mascota , propietario , fecha , hora , sintomas } = cita

    // onSubmit Function
    const submitCita = (e) => {
        e.preventDefault();
        
        // Validaciones
            // trim: elimina los espacios de una cadena string / al escribir un espacio no lo detectara como caracter
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true)
            return
        }
        // Eliminar mensaje de error 
        actualizarError(false); 

        // Asignar ID (esto es simulado la BDD lo asigna en un proy. de producción)
            // Lo asignamos con ayuda de -> npm i uuid
        cita.id = uuid();

        // Crear Cita mediante proops (le mandamos la cita al componente principal)
        scrollWin(x) 
        crearCita(cita);

        // Reset Form 
        actualizarCita({ //pasamos los parametros en blanco y los inputs leen dicho valor cada uno
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        })

    }

    return( 
        <Fragment>

            <h2>Crear una Cita</h2>

            {error 
                ?
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Faltan Campos por Llenar!</strong> <br/> * Todos los Campos son Obligatorios.
                    <button 
                        type="button" 
                        class="close" 
                        data-dismiss="alert" 
                        aria-label="Close"
                        onClick={() => actualizarError(false)}
                        >
                        <span aria-hidden="true">&times;</span>  
                    </button>
                </div>
                :
                null
            }

            <form 
                onSubmit={submitCita}
                className="py-3 "
                style={{maxHeight:"680px" }}
            >
                <div className="input-group mb-5">
                    <input 
                        type="text" 
                        className="form-control"  
                        name="mascota" 
                        placeholder="Nombre de tu Mascota" 
                        aria-label="Nombre de tu mascota" 
                        aria-describedby="basic-addon1"
                        onChange = {actualizarState}
                        value={mascota}
                        maxLength="20"
                        />
                </div>

                <div className="input-group mb-5">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="propietario"  
                        placeholder="Nombre del Dueño" 
                        aria-label="Nombre del dueño" 
                        aria-describedby="basic-addon2"
                        onChange = {actualizarState}
                        value={propietario}
                        maxLength="35"
                        />
                </div>

                <div className="input-group mb-5">
                    <input 
                        type="date" 
                        className="form-control"  
                        name="fecha"   
                        aria-label="Username" 
                        aria-describedby="basic-addon3"
                        onChange = {actualizarState} 
                        value={fecha} 
                        />
                </div>

                <div className="input-group mb-5">
                    <input 
                        type="time" 
                        className="form-control"  
                        name="hora"  
                        aria-label="Username" 
                        aria-describedby="basic-addon3"
                        onChange = {actualizarState}
                        value={hora}
                        />
                </div>

                <div className="input-group mb-5">
                    <textarea 
                        className="form-control" 
                        name="sintomas" 
                        placeholder="Cuentanos que sintomas presenta tu mascota..."  
                        aria-label="With textarea"
                        onChange = {actualizarState}
                        value={sintomas}
                        style={{maxHeight:"200px" }}

                        ></textarea>
                </div>  

                <div className="d-flex justify-content-center"> 
                    <button 
                        type="submit" 
                        className="btn w-100  btn-outline-secondary" 
                        >Agrega tu cita</button>   
                </div>
            </form>

        </Fragment>
     );
}
 
export default  Form;