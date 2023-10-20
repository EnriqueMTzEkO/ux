import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';

import axios from "axios";

export default function Details() {
  const [movieDetails, setMovieDetails] = useState([])
  const [seccionVisible, setSeccionVisible] = useState(false);
  const [textoIngresado, setTextoIngresado] = useState('');

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
    setTextoIngresado('')
    
  }

  // campo de texto
  const handleChangeTexto = (event) => {
    setTextoIngresado(event.target.value);
    console.log(textoIngresado)
  }

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
          <input
            type="text"
            value={textoIngresado}
            onChange={handleChangeTexto}
            placeholder="Escribe aquí"
          />
          <button onClick={toggleSeccion}>enviar(un icono)</button>
        </div>
        )}
        </div>
    </div>
    </>
    );
}
 

