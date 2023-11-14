import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import $ from 'jquery';
import Popper from 'popper.js';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../footerPages.css';
import NavbarHome from "../components/navbarHome";
import { SearchResults } from '../components/SearchResults';
import Footer from '../components/footer';


export default function Nosotros() {

    const [filtro, setFiltro] = useState([]);

  return (
      <>
      <NavbarHome setFiltro={setFiltro}/>
      <SearchResults filtro={filtro}/>
      <div id='nosotros'>

      </div>
      <div id='footer-section'>
        <Footer/>
      </div>
      </>
    );
  }