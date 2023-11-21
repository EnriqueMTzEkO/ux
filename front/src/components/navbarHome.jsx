import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios'
import $ from 'jquery';
import Popper from 'popper.js';
import '../index.css';

const NavbarHome = ({setFiltro}) => {
    const [movieSearch, setMovieSearch] = useState("");
    const location = useLocation();



      const getData = async (value) => {
        if(value !== ''){
        try {
          const response = await axios.get(`http://localhost:9000/api/buscador/${value}`)
          const peliculas = (response.data.results);
          const filtro = peliculas.filter((movie) => {
            return(
              value &&
              movie.id &&
              movie.title.toLowerCase().includes(value) &&
              movie.release_date);
          });
          setFiltro(filtro)
        } catch (e)
        {
          console.error(e);
        }
        }else{
          setFiltro('')
        }
      }

      const handeleChange = (value) => {
        setMovieSearch(value)
        getData(value)
      }

    return ( 
      <nav id='navbar' className="navbar">
      <div id="container-fluid" className="container-fluid">
        <form className="d-flex mx-auto" role="search">
          <FaSearch id='search-icon'/>
          <input className="form-control" type="search" placeholder="Pelicula" aria-label="Search" value={movieSearch} onChange={(e) => handeleChange(e.target.value)}/>
        </form>
      </div>
    </nav>
     );
}
 
export default NavbarHome;