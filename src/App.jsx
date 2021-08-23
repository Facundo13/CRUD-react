import React,{useState} from 'react';
import { nanoid } from 'nanoid'

function App() {

  const [tarea,setTarea] = useState('');
  const [listaTareas,setListaTareas] = useState([]);
  const [modoEdicion,setModoEdicion] = useState(false);
  const [id,setId] = useState('');
  const [error,setError] = useState(null);

  const agregarTarea = e => {
    e.preventDefault();

    if(!tarea.trim()){
      setError('Escriba algo por favor..')
      return;
    }

    setListaTareas([
      ...listaTareas,
      {id: nanoid(), nombreTarea: tarea}
    ])

    setTarea('')
    setError(null)
  }

  const deleteTarea = id =>{
    const arrayFiltrado = listaTareas.filter(tarea => tarea.id !== id);
    setListaTareas(arrayFiltrado);
    if(modoEdicion){
      setModoEdicion(false)
      setTarea('')
      setId('')
      setError(null)
    }
  }

  const editar = tarea =>{
    setModoEdicion(true)
    setTarea(tarea.nombreTarea)
    setId(tarea.id)
  }

  const editarTarea = e =>{
    e.preventDefault();

    if(!tarea.trim()){
      setError('Escriba algo por favor..')
      return
    }

    const arrayEditado = listaTareas.map(item => item.id === id ? {id:id,nombreTarea:tarea} : item)
    setListaTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }

  return (
    <div className="container">
      <h1 className="text-center">CRUD App</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

              listaTareas.length === 0 ? (
                <li className="list-group-item text-center bg-info">No hay tareas pendientes!</li>
              ) : (
                listaTareas.map(tarea => (
                  <li className="list-group-item d-flex justify-content-between align-items-center" key={tarea.id}>
                    <span className="lead">{tarea.nombreTarea}</span>
                    <div>
                      <button className="btn btn-warning btn-sm" onClick={() => editar(tarea)}>Editar</button>
                      <button className="btn btn-danger btn-sm mx-2" onClick={() => deleteTarea(tarea.id)}>Eliminar</button>
                    </div>
                  </li>
                ))
              )
            }   
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input type="text" className="form-control mb-2" placeholder="Ingrese tarea" onChange={e => setTarea(e.target.value)} value={tarea}/>
            {
                modoEdicion ? 
                (
                  <button className="btn btn-warning w-100" type="submit">Editar</button>
                ) 
                : 
                (
                 <button className="btn btn-dark w-100" type="submit">Agregar</button>
                )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
