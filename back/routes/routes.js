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
  
  routes.get('/api/detalles/:movieid', async (req, res) => {
    const pelicula = req.params.movieid
    try {
      const response  = await axios.get(`https://api.themoviedb.org/3/movie/${pelicula}?api_key=ea0c3d3f1b614245cc2f0b2696f6acc5&language=es-ES`)
      const data = response.data;
        res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error en el servidor');
    }
  });


  routes.post('/api/db/comentario', (req, res) =>{
    req.getConnection((err, conn) => {
      const nombre = req.body.nombre;
      const comentario = req.body.comentario;
      const id = req.body.id;
      if(err) return res.send(err)
      conn.query('INSERT INTO resenas (usuario, comentario, puntuacion, Peliculas_IDS) VALUES (?, ?, ?, ?)', [nombre, comentario, 0, id], (err, result) => {
        if(err){
          console.log(err);
        } else{
            res.send('comentario añadido')
        }
    })
    })
    
    })

    routes.post('/api/db/pelicula', (req, res) =>{
      req.getConnection((err, conn) => {
        const id = req.body.id;
        const titulo = req.body.titulo;
        const sinopsis = req.body.sinopsis;
        const puntuacion = req.body.puntuacion;
        if(err) return res.send(err)
        conn.query('INSERT INTO Peliculas (Peliculas_ID, Titulo, sinopsis, Puntuacion) VALUES (?, ?, ?, ?)', [id, titulo, sinopsis, puntuacion], (err, result) => {
          if(err){
            console.log(err);
          } else{
              res.send('comentario añadido')
          }
      })
      })
      
      })

      routes.get('/api/db/comentarios', async (req, res) => {
        req.getConnection(async (err, conn) => {
        const pelicula = req.params.movieid;
        try {
          const response = await axios.get(`SELECT * FROM Resenas INNER JOIN Peliculas ON Peliculas_ID = Peliculas_IDS where Peliculas_ID = ?`, [pelicula])
          const data = response.data;
            res.json(data);
          } catch (error) {
            console.error('Error:', error);
            res.status(500).send('Error en el servidor');
          }
        })
        });
    


    

module.exports = routes;

