import { useState  } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(fas);

import '../index.css'

export default function Footer(){


  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  });


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verificar si hay campos vacíos antes de enviar el formulario
    if (formData.name.trim() === '' || formData.telefono.trim() === '' || formData.asunto.trim() === '' || formData.mensaje.trim() === '') {
      alert('Por favor, completa todos los campos antes de enviar el formulario.');
    }
    else{
      emailjs.sendForm('service_xhmdj0h', 'template_yqfqrtk', event.target, 'c-zTchRSwAI6-ERC4')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    }

    // Aquí puedes realizar la lógica para enviar los datos del formulario
    // Por ejemplo, llamar a una función para enviar los datos a un servidor

    // Resetear los campos después del envío, si es necesario
    setFormData({
      name: '',
      telefono: '',
      asunto: '',
      mensaje: '',
    });
  };

  return (
    <div className='mt-5' id='footer'>
    <div className='container'>
      <div className='row mt-3 pb-5'>
        <div className='col-md-4'>
          <h6 class="contactanos">Contacto</h6>
          <form onSubmit={handleSubmit}>
            <div className="lbl">
              <label></label>
              <input
                type="text"
                className='formInp'
                id="name"
                name="name"
                placeholder='Tu nombre'
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="lbl">
              <label></label>
              <input
                type="text"
                className='formInp'
                id="telefono"
                name="telefono"
                placeholder='Tu telefono'
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="lbl">
              <label></label>
              <input
                type="text"
                className='formInp'
                id="asunto"
                name="asunto"
                placeholder='Asunto (problemas, dudas, etc)'
                value={formData.asunto}
                onChange={handleChange}
              />
            </div>
            <div className="lbl">
              <label></label>
              <input
                type="text"
                className='formInp'
                id="mensaje"
                name="mensaje"
                placeholder='Deja aquí tu mensaje...'
                value={formData.mensaje}
                onChange={handleChange}
              />
            </div>
            <button type="submit" id='enviar'><b>Enviar</b></button>
        </form>
      </div>
      <div className='col-md-4 container text-center mt-4'>
        <i class="fa-solid fa-phone"></i>
        <p class="num">+524420699774</p>
        <FontAwesomeIcon icon="location-dot" className="fa-solid" />
        <p class="num">Blvd. Juan Pablo II No. 1302 Ex hacienda la Cantera, 20200<br />Aguascalientes, Ags.</p><br /> 
      </div>
      <div className='col-md-4 text-center'>
      <h6 class="contactanos">Sobre nosotros</h6>
      <Link to={"/contactanos"}>
        <p className='servicios'>Contactanos</p>
      </Link>
      <Link to={"/nosotros"}>
        <p className='servicios'>Nosotros</p>
      </Link>
      </div>
    </div>
  </div>
  </div>
);
};
