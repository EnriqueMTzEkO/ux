import { useEffect, useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { SearchResults } from '../components/SearchResults';
import Footer from "../components/footer";
import '../index.css'


export default function Contactanos(){
    const [filtro, setFiltro] = useState([]);



    const { movieid } = useParams();
    return (
      <>
    <Navbar setFiltro={setFiltro}/>
    <SearchResults filtro={filtro}/>
      <div class="container" style={{minHeight: "70vh", marginTop: "20vh"}}>
        <div id='cttns' class="row d-flex justify-content-center">
            <div class="col-md-6 sec-izq">
                <section id="sec-img">
                    <div class="row dsp">
                        <div class="col-lg-6">
                            <h6>Direccion</h6>
                            <p>Ameca 108, La Soledad, 20326 Aguascalientes, Ags.</p>
                            <h6>Horario</h6>
                            <p>Lunes a viernes 8:00 - 18:00</p>
                            <p>Sábado 8:00 - 14:00</p>
                        </div>
                        <div class="col-lg-6">
                            <h6>Correo electronico</h6>
                            <p>henka.sukiru@yahoo.com</p>
                            <h6>Telefono</h6>
                            <p>+52 449 806 58 56</p>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-lg-6 d-flex justify-content-center">
            <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1851.736779926482!2d-102.35525006649483!3d21.83926210799549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8429eb8c66ba4c57%3A0x800a85fa04315af2!2sUniversidad%20Tecnol%C3%B3gica%20de%20Aguascalientes!5e0!3m2!1ses-419!2smx!4v1701276458182!5m2!1ses-419!2smx"
            title="location"
                width="600"
                height="450"
                className="gMap"
            />
            </div>
        </div>
      </div>
  <Footer />
  </>
    );
  }