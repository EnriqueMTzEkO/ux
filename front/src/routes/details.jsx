import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import Form from '../components/form';
import { SearchResults } from '../components/SearchResults';
import '../../src/details.css';
import { FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";


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
        <div id='detallesid' className='row mb-5'>
            <div id='movie-details' className='col-md-6'>
            <h2 className='title'>{movieTitle}</h2>
            <p className='overview'>{movieOverview}</p>
            <h5>Generos</h5>
            {genres?.map(gen => (
              <p key={gen.name} className='gen'>{gen.name}</p>
            ))}
            <h5>Puntuacion</h5>
            <p>{avg}</p>
        </div>
        <div id='pelicula-img' className='col-md-6'>
            <img id='poster'
            src={`https://image.tmdb.org/t/p/w500/${posterPath}`}
            />
        </div>
        </div>
        <div id='add-comment'>
        <button id='comment-button' class="btn btn-warning" onClick={toggleSeccion}>
        {seccionVisible ? (
          <>
          <p>cerrar</p>
          <IoMdClose className='comment-icons'/>
          </>
          ) : (
            <>
            <p>Añadir comentario</p>
            <FaPlus className='comment-icons'/>
            </>
            ) }
      </button>

      {seccionVisible && (
        <div>
          <Form comment={comment} setComment={setComment}/>
        </div>
        )}
        </div>
        <div id='comments'>
          {comments.map(val => (
          <div id='commentar' className="row" key={val.Resenas_ID}>
            <div id='username' className="col-md-3">
              <p>{val.Usuario}</p>
            </div>
            <div id='movie-comment' className="col-md-5">
              <p>{val.comentario}</p>
            </div>
            <div id='votes' className="col-md-4">
              <button id='inc' className={val.upvoted ? 'increase-button' : 'vote-button'} onClick={() => increaseValue(val.Resenas_ID)} ><><FaArrowUp className='vote-icons' /></></button>
              <button id='dec' className={val.downvoted ? 'decrease-button' : 'vote-button'} onClick={() => decreaseValue(val.Resenas_ID)}><><FaArrowDown className='vote-icons' /></></button>
              <p>{val.Puntuacion}</p>
            </div>
          </div>
    ))}
        </div>
    </div>
    </>
    );
}
 