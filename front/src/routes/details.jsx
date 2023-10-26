import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Form from '../components/form';
import { SearchResults } from '../components/SearchResults';

import axios from "axios";

export default function Details() {
  const [movieDetails, setMovieDetails] = useState([])
  const [seccionVisible, setSeccionVisible] = useState(false);
  const [comments, setComents] = useState([])
  const [comment, setComment] = useState({
    nombre: '',
    comentario: ''
  })
  const [voteUpdated, setvoteUpdated] = useState(false)
  const [filtro, setFiltro] = useState([]);



  const { movieid } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/detalles/${movieid}`)
        setMovieDetails(response.data)
      } catch (e)
      {
        console.error(e);
      }
      
    }


    getData();
  }, []);

  const posterPath = movieDetails.poster_path;
  const movieOverview = movieDetails.overview;
  const movieTitle = movieDetails.title;
  const avg = movieDetails.vote_average;
  const genres = (movieDetails.genres);




  // visibilidad
  const toggleSeccion = () => {
    setSeccionVisible(!seccionVisible);
    axios.post(`http://localhost:9000/api/db/pelicula`, {
    id: movieid,
    titulo: movieTitle,
    sinopsis: movieOverview,
    puntuacion: avg
    })
    .then(() => {
    })
    
  }
  

  useEffect(() => {
        fetch(`http://localhost:9000/api/db/comentarios/${movieid}`)
        .then((response) => response.json())
        .then((data) => setComents(data))
        .catch((error) => console.log(error));
  }, [voteUpdated]);

  const increaseValue =  id => {
    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    }
      fetch('http://localhost:9000/api/db/incrementar/' + id, requestInit)
      .then(res => res.text())
      setvoteUpdated(!voteUpdated)
  }

  const decreaseValue =  id => {
    const requestInit = {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'}
    }
      fetch('http://localhost:9000/api/db/decrementar/' + id, requestInit)
      .then(res => res.text())
      setvoteUpdated(!voteUpdated)
  }

    return (
    <>
    <Navbar setFiltro={setFiltro}/>
    <SearchResults filtro={filtro}/>
    <div className="container">
        <div id='detalles'>
            <div id='movie-details'>
            <h2 className='title'>{movieTitle}</h2>
            <p className='overview'>{movieOverview}</p>
            {genres?.map(gen => (
              <p key={gen.name} className='gen'>{gen.name}</p>
            ))}
            <p>{avg}</p>
        </div>
        <div id='pelicula-img'>
            <img
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            />
        </div>
        </div>
        <div>
        <button onClick={toggleSeccion}>
        {seccionVisible ? 'cerrar o icono' : 'Añadir un comentario (un icono)'}
      </button>

      {seccionVisible && (
        <div>
          <Form comment={comment} setComment={setComment}/>
        </div>
        )}
        </div>
        <div>
          {comments.map(val => (
          <div className="row" key={val.Resenas_ID}>
            <div className="col-md-3">
              {val.Usuario}
            </div>
            <div className="col-md-5">
              {val.comentario}
            </div>
            <div className="col-md-4">
              <button onClick={() => increaseValue(val.Resenas_ID)} >up</button>
              <button onClick={() => decreaseValue(val.Resenas_ID)}>down</button>
              <p>{val.Puntuacion}</p>
            </div>
        </div>
    ))}
        </div>
    </div>
    </>
    );
}
 

