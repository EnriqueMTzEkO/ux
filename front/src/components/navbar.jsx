import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import $ from 'jquery';
import Popper from 'popper.js';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../index.css';

const Navbar = () => {
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
      <nav id='navbar' className="navbar">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Pelicula" aria-label="Search"/>
          <button className="btn btn-success" type="submit">Buscar</button>
        </form>
      </div>
    </nav>
     );
}
 
export default Navbar;