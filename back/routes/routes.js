const express = require('express');
const axios = require('axios');
const path = require('path');
const routes = express.Router();


// routes.get('/', (req, res) => {
//     req.getConnection((err, conn) =>{
//         if(err) return res.send(err)

//         conn.query('')
//     })
// })


routes.get('/api/lista', async (req, res) => {
    try {
      const response  = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=ea0c3d3f1b614245cc2f0b2696f6acc5&language=es-ES`)
      const data = response.data;
        res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error en el servidor');
    }
  });
  


    

module.exports = routes;

