import { useEffect, useState } from 'react'
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios'
import Details from '../routes/details';

function Peliculas() {

    const [movieList, setMovieList] = useState([])


    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.get('http://localhost:9000/api/lista')
          console.log(response.data)
          setMovieList(response.data.results)
        } catch (e)
        {
          console.error(e);
        }
        
      }

      getData();
    }, []);
    
    
    console.log(movieList)

    
    

    
  return (
    <>
    {/* Poster/Imagen */}
    
    <ul id='peliculas'>
      {movieList.map((movie)=>(
        <li 
        key={movie.id} className='item'>
          <Link className='pelicula' key={movie.id} id={movie.id} to={`/detalles/${movie.id}`}>
          <div id='movie-details'>
            <h2>{movie.title}</h2>
            <p>{(movie.overview).length > 300 ? movie.overview.substring(0, 300) : movie.overview}...</p>
          </div>
          <div id='pelicula-img'>
        <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        />
        </div>
        </Link>
        </li>
      ))}
    </ul>
    </>
  )
}

export default Peliculas