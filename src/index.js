'use strict'
//Ejecutar dotenv
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const morgan = require('morgan')
const path = require('path') //unir directorios
const cors = require('cors')


// Lista para dar acceso a la api
// let whiteList = ['http://localhost:8080']

// let corsOptions = {
// 	origin: (origin,callback) => {
// 		if(whiteList, indexOf(origin) == -1){
// 			callback(null, true)
// 		}else{
// 			callback(new Error('Not allowed by CORS'))
// 		}
// 	}
// }

// app.get('/', cors(corsOptions), (req, res) =>{
// 	res.json({mensaje: 'ok'})
// })

//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
	//datos de un formulario
app.use(express.urlencoded({extended: false}))
	//datos type json
app.use(express.json())
//CORS
app.use(cors())
//Routes
app.use(require('./routes/index'))

//Static Content
app.use(express.static(path.join(__dirname, 'public')))

//Subir el servidor
app.listen(3000)
console.log('Server listening...')