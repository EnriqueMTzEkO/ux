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
      const response  = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=???&language=es-ES`)
      const data = response.data;
        res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error en el servidor');
    }
  });

  routes.get('/api/buscador/:movieid', async (req, res) => {
    const pelicula = req.params.movieid
    try {
      const response  = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=???&query=${pelicula}&language=es-ES`)
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
      const response  = await axios.get(`https://api.themoviedb.org/3/movie/${pelicula}?api_key=???5&language=es-ES`)
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
      conn.query('INSERT INTO resenas (usuario, comentario, puntuacion, upvoted, downvoted, Peliculas_IDS) VALUES (?, ?, ?, ?, ?, ?)', [nombre, comentario, 0, false, false, id], (err, result) => {
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
        conn.query('INSERT INTO Peliculas (Peliculas_ID, Titulo, sinopsis, promedio) VALUES (?, ?, ?, ?)', [id, titulo, sinopsis, puntuacion], (err, result) => {
          if(err){
            console.log(err);
          } else{
              res.send('comentario añadido')
          }
      })
      })
      
      })

      routes.get('/api/db/comentarios/:peliculaId', (req, res) => {
        const peliculaId = req.params.peliculaId;
        const query = `SELECT * FROM Resenas INNER JOIN Peliculas ON Peliculas_ID = Peliculas_IDS where Peliculas_ID = ? ORDER BY puntuacion DESC`;
        req.getConnection(async (err, conn) => {
          conn.query(query, [peliculaId], (error, results) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Error al obtener las reseñas' });
            } else {
              res.json(results);
            }
          });
        });
      });

      routes.put('/api/db/incrementar/:id', (req, res) => {
        req.getConnection((err, conn)=>{
          if(err) return res.send(err);
          const id = req.params.id;
          conn.query('UPDATE Resenas SET Puntuacion = Puntuacion + 1, upvoted = (NOT upvoted), downvoted = false where Resenas_ID = ?', [id], (err, rows)=>{
              if(err) return res.send(err)
          })
      })
      });
      
      routes.put('/api/db/decrementar/:id', (req, res) => {
        req.getConnection((err, conn)=>{
          if(err) return res.send(err);
          const id = req.params.id;
          conn.query('UPDATE Resenas SET Puntuacion = Puntuacion - 1, downvoted = (NOT downvoted), upvoted = false where Resenas_ID = ?', [id], (err, rows)=>{
              if(err) return res.send(err)
          })
      })
      });


    

module.exports = routes;

