import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Form from '../components/form';

import axios from "axios";

export default function Details() {
  const [movieDetails, setMovieDetails] = useState([])
  const [seccionVisible, setSeccionVisible] = useState(false);
  const [comments, setComents] = useState([])
  const [comment, setComment] = useState({
    nombre: '',
    comentario: ''
  })



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
    const getComments = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/db/comentarios')
        setComents(response.data);
      } catch (e)
      {
        console.error(e);
      }
      
    }


    getComments();
  }, []);

  console.log(comments)

    return (
    <>
    <Navbar />
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
          {comments.map((comment, key) => {
            <div>
              
            </div>
          })
        }
        </div>
    </div>
    </>
    );
}
 

