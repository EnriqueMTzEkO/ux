import React from "react";
import { Outlet, Link, useParams } from 'react-router-dom';
import axios from "axios";
import { IoSend } from "react-icons/io5";

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
        <form id="coment-form" className="mt-3" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='form-label'>Nombre</label>
            <input className="form-control" type="text" name="nombre" id="name" onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="comment" className='form-label mt-2'>Comentario</label>
            <input  className="form-control mb-4" type="text" name="comentario" id="comment" onChange={handleChange} />
          </div>
          <button type="submit" id="send-comment" class="btn btn-success">
            <>
            <p>Enviar</p>
            <IoSend id="send-comment-icon"/>
            </>
          </button>
          </form>
    );
};

  export default Form;