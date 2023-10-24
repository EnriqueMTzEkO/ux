import React from "react";
import { Outlet, Link, useParams } from 'react-router-dom';
import axios from "axios";

const Form = ({comment, setComment}) => {


  const { movieid } = useParams();

    const handleChange = e => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = () => {

    if(comment.nombre === '' || comment.comentario === ''){
        alert("Por favor agrega tu nombre y tu opinion de la pelicula")
        return
    }

    axios.post(`http://localhost:9000/api/db/comentario`, {
      nombre: comment.nombre,
      comentario: comment.comentario,
      id: movieid
    })
    .then(() => {
      alert('gracias por el comentario');
    })
    
  }
    return(
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='form-label'>Nombre</label>
            <input type="text" name="nombre" id="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="comment" className='form-label'>comentario</label>
            <input type="text" name="comentario" id="comment" onChange={handleChange} />
          </div>
          <button type="submit">enviar(un icono)</button>
          </form>
    );
};

  export default Form;