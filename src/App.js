import React ,  {Fragment,useState,useEffect}from 'react';
import Form from './components/Form'
import Cita from './components/Cita'
import SocialLinks from './components/SocialLinks' 
import PropTypes from 'prop-types'
import "./style.scss" 
import { 
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


function App() {

  // GET LOCAL STARAGE
  // Citas en local Storage  // LOCAL STORAGE SET | Local starage solo admite strings
  let citasIniciales = JSON.parse(localStorage.getItem('citas')) //-key del LS //convirtiendo de array a string con JSON.parse
  if(!citasIniciales){
    citasIniciales = [] //si no hay nada en LS iniciamos con un array vacio
  }

  // State CREAR CITAS 
  // Array de citas (para el stage y posteriormente iterarlas en render)
    // traemos la cita desde el componente padre mediante proops y acá ordenamos que se guarde en el stage
  const [citas , guardarCitas] = useState (citasIniciales)


  //LOCAL STORAGE (SET y DELETE) 
  // useEffect para realizar ciertas operaciones cuando el state cambia
    // similar a documentready jq o document.content.loaded 
    // useEffect se actuaiza cuando el componente esta cargado y tambien cuando hay cambios en el componente (se recarga)

  useEffect(() => {

    if (citasIniciales) { //si da true hay contenido y lo metemos al LS | si no asignamos un array vacio
      localStorage.setItem('citas', JSON.stringify(citas)) //(Key,Valor) //SET (lo agrega a la cola)

    } else {
      localStorage.setItem('citas', JSON.stringify([])) //si no hay lo ponemos vacio //SET 
      //  el delete lo aplicamos primero al array del stage con un filter() by id
      //  luego condicionamos aquí para guardar ese nuevo array y si no hay contenido agregamos un array vacio
    }
  }, [citas, citasIniciales]) //dependencias  //con un array  le indicamos que solo se ejecute una unica vez (de otra forma se cicla)

  

  //  Agregar cita al state
  const crearCita = (cita) => {
    // console.log(cita)
    guardarCitas([
      cita ,//le pasamos al state las citas
      ...citas //copia para que sobrescriba el state y llene completamente todos
    ])
  }
  
  
// Eliminr Cita por ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id) //filtramos excluyendo el id borrado y se crea una copia sin el id seleccionado
    guardarCitas(nuevasCitas) //enviamos nuevamente al state el array sin el id seleccionado
  }

  // mensaje condicional otro metodo
  // const tituloCitas =  citas.length === 0 ? 'Listado de Citas VACIO' : 'Administra tus citas'

  return (
    <Fragment>
      <SocialLinks/>
      <h1>Administra tus Citas</h1>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5 col-12  form-wrapper  table-bordered border-blue mr-md-3">
            <Form
              crearCita={crearCita} //proops
            />
          </div> 

          <div className="col-md-5 col-12 px-3 py-5 py-md-0 wrapper-citas">

          { Object.keys(citas).length === 0 ? <h2 className="text-center">No hay citas aún</h2> : null}

            <TransitionGroup>
              {citas.map(cita => (
                <CSSTransition
                  key={cita.id}
                  timeout={{
                    appear: 100,
                    enter: 300,
                    exit: 500,
                  }}
                  classNames="item">
                    <Cita
                    key={cita.id} //cuando iteramos en react debemos declarar un key 
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                  
                </CSSTransition>

              ))}
            </TransitionGroup>
          </div>
        </div>
      </div>

    </Fragment>
  );
}

// con los proptypes declaramos el tipo de dato
  // es como hacer un typechecking o documentar el componente
  // si no es el tipo el tipo de dato requerido o no existe marcara error  
  // https://medium.com/laboratoria-developers/qu%C3%A9-es-proptypes-y-por-qu%C3%A9-usarla-19afb4b8981e
Form.propTypes = {
  crearCita: PropTypes.func.isRequired
}


export default App;
