const express = require('express');
const mysql = require('mysql2');
const myconn = require('express-myconnection');
const cors = require('cors');



const routes = require('./routes/routes')

const app = express()
app.use(cors());


app.set('port', process.env.PORT || 9000)

const dboptions = {
host: '???',
port: '???',
user: '???',
password: '???',
database: '???'
}





app.use(express.json());
app.use(myconn(mysql, dboptions, 'single'));
app.use(routes);

// rutas
app.get('/', (req, res)=>{
    res.send('api funcionando')
})


app.use('/api', routes);


// servidor corriendo 
app.listen(9000, () => {
    console.log('servidor corriendo en: ' + 9000)
})
