
import { useState, useEffect } from 'react'

export function Lista({name}) {

    const [all, setAll] = useState([]);
    const [pages, setPages] = useState(1);
    
    const getAll = () => {
        let arr = []
        for (let i = 1; i < 24; i++) {
            fetch("https://rickandmortyapi.com/api/character/?page=" + i)
                .then(res => res.json())
                .then(res => arr.push(...[...res.results]))
        }
        setAll(arr)        
    }
    useEffect(() => {
        getAll()
        console.log("get all pages");
    }, [])
    
    let arr2 = all.filter(val => {  
        if (val.name.toLowerCase().includes(name.toLowerCase())) {
            return true
        }
    }) 
   
    return (
        <>
            {
                arr2.map((item) => {
                    return(
                    <div className="list" key={item.id}>
                        <img src={item.image} alt="imagen del personaje" />
                        <h2>{item.name} </h2>
                        <p>Estado: {item.status}</p>
                        <p>Especie: {item.species}</p>
                        <p>Genero: {item.gender}</p>
                        <p>Origen: {item.origin.name}</p>
                    </div>
                    )
                })
            }
        </>
    );
}          
