import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Peliculas from '../components/movies';
import Navbar from '../components/navbar';

import axios from "axios";

export default function Details() {
    const [movieList, setMovieList] = useState();

    useEffect(() => {
        const getMovie = async () => {
          try {
            const response = await axios.get('http://localhost:9000/api/lista')
            console.log(response.data)
            setMovieList(response.data.results)
          } catch (e)
          {
            console.error(e);
          }
          
        }
  
        getMovie();
      }, []);

    const { movieid } = useParams();
    console.log(movieid);
    return (
    <>
    <Navbar />
    <div className="container">
        <div id='detalles'>
            <div id='movie-details'>
            <h2>{movieid}</h2>
            <p>{movieid}</p>
        </div>
        <div id='pelicula-img'>
            {/*
            <img
            src={`https://image.tmdb.org/t/p/w300575264`}
    />*/}
        </div>
        </div>
    </div>
    </>
    );
}
 

