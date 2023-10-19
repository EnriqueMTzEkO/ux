import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import $ from 'jquery';
import Popper from 'popper.js';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../index.css';
import Peliculas from '../components/peliculas';


export default function Home() {

  const [resultado, setResultado] = useState(null);

  const buscarPelicula = async (titulo) => {
    try {
      const response = await fetch(`/api/buscar-pelicula/${titulo}`);
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error('Error al buscar la película:', error);
    }
  }

  return (
      <>
  <nav id='navbar' className="navbar  fixed-top">
  <div className="container-fluid">
  <button id='user-button' className="nav-link dropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      <BsFillPersonFill size={50} />
    </button>
    <ul className="dropdown-menu">
      <li><a className="dropdown-item" href="#">Action</a></li>
      <li><a className="dropdown-item" href="#">Another action</a></li>
      <li><a className="dropdown-item" href="#">Something else here</a></li>
    </ul>
    <div id='buscador' className="d-flex mt-0" role="search">
          <input
          id='buscador'
          className="form-control me-2 pe-5" type="text"
          placeholder="Título de la película"
          onChange={(e) => buscarPelicula(e.target.value)}/>
        </div>
        {resultado && resultado.results && (
        <div>
          <h2>Resultados:</h2>
          {resultado.results.map((pelicula) => (
            <div key={pelicula.id}>
              <h3>{pelicula.title}</h3>
              <p>{pelicula.overview}</p>
            </div>
          ))}
        </div>
      )}

    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form id='buscador-movil' className="d-flex mt-3" role="search">
          <input id='buscador-movil' className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button id='buscador-movil' className="btn btn-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </div>
</nav>
  <div id='movie-list' className='container'>
    <Peliculas />
  </div>
      </>
    );
  }