import { useEffect, useState } from 'react'
import axios from 'axios'

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
    
    <div id='peliculas'>
      {movieList.map((movie)=>(
        <div
        key={movie.id} id={movie.id} className='pelicula'>
          <div id='movie-details'>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
          </div>
          <div id='pelicula-img'>
        <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        />
        </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Peliculas