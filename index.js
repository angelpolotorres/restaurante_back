// Importaciones - módulos que necesito
const express = require('express');
const fs = require('fs');
const comandasRouter = require('./routes/comandasRouter.js')

// Importamos CORS para poder hacer peticiones desde front
const cors = require('cors');

// Instancio mi Express App
const app = express();

// Añado el parser para que sepa interpretar x-www-form-urlencoded
// Parser: código que interpreta y entiende una cadena de caracteres
app.use(express.urlencoded({ extended: true }));

// Añadimos el parser para JSON
// De esta forma mi Express es capaz de entender un JSON
app.use(express.json());

// Llamamos al modulo Cors para poder hacer peticiones desde front
app.use(cors());

// Routing
app.use('/comandas', comandasRouter)

app.get('/', (req, res) => {
	res.send('Servidor Activo')
});

// ENDPOINT POST - Añadir comanda
// app.post('/comanda/add', (req, res) => {

// 	// Dejamos señal en la consola de que endpoint estamos usando OPCIONAL
// 	console.log('Endpoint comanda/add');

// 	// Pasamos datos de la llamada a variables
// 	const comanda = req.body;
// 	const { camarero, productos } = comanda;

// 	// Leemos comandas existentes en comandas.db
// 	fs.readFile('./comandas.db', {encoding: 'utf-8'}, (err, data) => {
// 		if (err) throw new Error ('Error al leer el archivo comandas.db');

// 		// Parseamos comandas.db a un objeto
// 		let listaComandas = JSON.parse(data);

// 		// Consultamos cuantas comandas hay en comandas.db
// 		const numComandas = Object.keys(listaComandas).length;

// 		// Estructuramos nueva comandas
// 		const newComanda = {
// 			id : numComandas + 1,
// 			camarero : camarero,
// 			date : new Date(),
// 			productos : productos,
// 			completa: false
// 		};

// 		// Añadimos nueva comanda a la lista de comandas y las pasamos a string
// 		// para actualizar la base
// 		listaComandas = {...listaComandas, [newComanda.id] : newComanda };
// 		listaComandas = JSON.stringify(listaComandas);

// 		// Escribimos el archivo nuevo de comandas.db
// 		fs.writeFile('./comandas.db', listaComandas, {flag: 'w'}, (err) =>{
// 			if (err) throw new Error ('No se ha podido actualizar comandas.db');
// 		});

// 		// Responder al cliente que todo funcionó guay.
// 		res.json(`Se ha añadido comanda num ${numComandas + 1}`);
// 	});
	
// });


// ENDPOINT GET - Consultar una comanda por su ID
// app.get('/comanda/details/:id', (req, res) => {

// 	// Almacenamos el id a consultar en una variable
// 	let idComanda = req.params.id;
// 	let comandaReturn;

// 	//Leer comandas.db y encontrar la comanda indicada
// 	fs.readFile('./comandas.db', {encoding: 'utf-8'}, (err, data) => {
// 		if (err) throw new Error (`No se ha encontrado la comanda ${req.params.id}`);
		
// 		//Parseamos comandas.db a un objeto
// 		let listaComandas = JSON.parse(data);

// 		// Buscamos la comanda (formato objeto) que queremos y la metemos en la variable
// 		comandaReturn = listaComandas[idComanda];	

// 		// Transformamos la comanda de objeto a string
// 		comandaReturn = JSON.stringify(comandaReturn);

// 		// Devolvemos la comanda (string). Ojo, desde dentro de la funcion para no causar asincronia
// 		res.send(comandaReturn);
// 	});
// });

// ENDPOINT GET - Ver todas las comandas
// app.get('/comanda/lista', (req, res) =>{

// 	// Leemos comandas.db 
// 	fs.readFile('./comandas.db', { encoding: 'utf-8' }, (err, data) => {
// 		if (err) throw new Error ('No se ha podido leer comandas.db entero');

// 	// Devolvemos comandas.db
// 	res.send (data);
// 	});
// });


// Llamada básica para levantar el servidor
app.listen(3000, () => { console.log ('Server runing on port 3000') });


