import React from "react";
import Navbar from '../components/navbar';
import Footer from "../components/footer";
import '../index.css'
import reacticon from '../img/reacticon.png'
import utags from '../img/utags.jpg'
import tmdb from '../img/tmdb.png'



export default function Nosotros(){
    return (
      <>
      <Navbar />
    <div>
    <section style={{marginTop: "3vh", height: "70vh", }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-4 my-5">
              <div className="card" style={{width: "18rem"}}>
                <img src={reacticon} className="card-img-top" alt=""/>
                <div className="card-body">
                  <h5 className="card-title">Misíon</h5>
                  <p className="card-text">Brindar soluciones efectivas a nuestros clientes, colaborando en la mejora de sus procesos, instalaciones y/o productos.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4  my-5">
              <div className="card" style={{width: "18rem"}}>
                <img src={utags} className="card-img-top" alt=""/>
                <div className="card-body">
                  <h5 className="card-title">Visión</h5>
                  <p className="card-text">Ser un empresa innovadora y creativa que aporte valor a los procesos en la industria y ser una empresa reconocida por la calidad de nuestros servicios.
                    </p>
                </div>
              </div>
            </div>
            <div className="col-md-4  my-5">
              <div className="card" style={{width: "18rem"}}>
                <img src={tmdb} className="card-img-top" alt="nosotros"/>
                <div className="card-body">
                  <h5 className="card-title">Valores</h5>
                  <p className="card-text">Respeto <br/>Trabajo en equipo <br/>Tolerancia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  <Footer />
  </>
    );
  }