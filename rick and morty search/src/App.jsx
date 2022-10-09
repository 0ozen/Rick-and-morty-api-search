import './App.css'
import { Lista } from './listaBuscador/lista'
import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(1);
  const [buscador, setBuscador] = useState(false);
  const [names, setnames] = useState([]);
  const [nombre, setNombre] = useState("");


  const buscar = () => {
    fetch("https://rickandmortyapi.com/api/character/?page=" + count)
      .then(res => res.json())
      .then(res => setnames(res.results))
  } 
  useEffect(() => {
    buscar()
    console.log("cambio de pagina");
  }, [count])



  if (count == 0) {
    return (
      setCount((count) => count + 1)
    )
  }


  const personaje = () => {
    setBuscador(!buscador)
    setCount(0)
    console.log("contador reiniciado");
  }
 

  if (buscador) {
    return (
      <div className="App">

        <h1>Rick and Morty api</h1>
        <label  htmlFor=""
                className='busca'>
                Buscar
        </label>
        <input  className='innput' type="text" 
                required 
                placeholder='nombre del personaje'
                onChange={ (e) => { setNombre(e.target.value) } } />

        <button className='cerrar'
                onClick={ () => {personaje()} } >
                ✖
        </button>

        <div className="personajes">       
            <Lista name={nombre}/>    
        </div>
        
      </div>
    )
  }

  return (
    <div className="App">

      <h1>Rick and Morty api</h1>
      <div className="card">

        <button
          className='buscar'
          onClick={ () => {personaje()} }>
          Buscar personaje
        </button>

        <button onClick={() => { setCount((count) => count - 1)} } >
          ⬅prev
        </button>

        <button>
          Page {count}
        </button>

        <button onClick={() => {
                setCount((count) => count + 1)
                }}>
         next➡
        </button>

      </div>

      <div className="personajes">
        {
          names.map((item) => {       
             return(
              <div className="list" key={item.id}>
                  <img src={item.image} alt="imagen del personaje" />
                  <h2> {item.name} </h2>
                  <p>Estado: {item.status} </p>
                  <p>Especie: {item.species} </p>
                  <p>Genero: {item.gender} </p>
                  <p>Origen: {item.origin.name} </p>
              </div>     
            )
          })
        }
      </div>
      
    </div>
  )
}

export default App
