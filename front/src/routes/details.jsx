import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Peliculas from '../components/movies';
import Navbar from '../components/navbar';

export default function Details() {

    const { movieid } = useParams
    console.log(movieid)
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
            <img
            src={`https://image.tmdb.org/t/p/w300${movieid}`}
            />
        </div>
        </div>
    </div>
    </>
    );
}
 

