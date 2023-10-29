import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import $ from 'jquery';
import Popper from 'popper.js';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../index.css';
import Peliculas from '../components/movies';
import NavbarHome from "../components/navbarHome";
import { SearchResults } from '../components/SearchResults';



export default function Home() {

  const [filtro, setFiltro] = useState([]);

  return (
      <>
      <NavbarHome setFiltro={setFiltro}/>
      <SearchResults filtro={filtro}/>
      <div id='movie-list' className='container'>
      <Peliculas />
  </div>
      </>
    );
  }