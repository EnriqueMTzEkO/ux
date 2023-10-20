import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useState } from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import $ from 'jquery';
import Popper from 'popper.js';
import { Outlet, Link, useLoaderData, Form } from "react-router-dom";
import '../index.css';
import Peliculas from '../components/movies';
import Navbar from '../components/navbar';


export default function Home() {

  return (
      <>
      <Navbar />
      <div id='movie-list' className='container'>
      <Peliculas />
  </div>
      </>
    );
  }