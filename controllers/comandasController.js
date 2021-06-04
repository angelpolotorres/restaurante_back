// Importamos mongoose
const mongoose = require('mongoose');

// Importamos nuestro modelo (Esquema) llamado Comanda
const Comanda = require('../models/ComandasModel.js');

// Conectamos con el servidor y creamos la db restaurante
// Lo segundo que le pasamos sirve para que que moongose use la nueva tipologia
mongoose.connect('mongodb://localhost:27017/restaurante', { useNewUrlParser: true, useUnifiedTopology: true});

// Creamos nuestro controlador que gestionara las peticiones
const comandasController = {
	getComandas: async function (req, res) {
		// Leemos comandas.db 
	//	fs.readFile('./comandas.db', { encoding: 'utf-8' }, (err, data) => {
	//	if (err) throw new Error ('No se ha podido leer comandas.db entero');

		// Devolvemos comandas.db
	//	res.send (data);
	//	});
		res.send ('Hellogui');
	},
	getComandaId : function (req, res) {
		console.log('test');
		res.send ('Hellogui2');
		
		// // Almacenamos el id a consultar en una variable
		// let idComanda = req.params.id;
		// let comandaReturn;

		// //Leer comandas.db y encontrar la comanda indicada
		// fs.readFile('../comandas.db', {encoding: 'utf-8'}, (err, data) => {
		// 	if (err) throw new Error (`No se ha encontrado la comanda ${req.params.id}`);
		
		// 	//Parseamos comandas.db a un objeto
		// 	let listaComandas = JSON.parse(data);

		// 	// Buscamos la comanda (formato objeto) que queremos y la metemos en la variable
		// 	comandaReturn = listaComandas[idComanda];	

		// 	// Transformamos la comanda de objeto a string
		// 	comandaReturn = JSON.stringify(comandaReturn);

		// 	// Devolvemos la comanda (string). Ojo, desde dentro de la funcion para no causar asincronia
		// 	res.send(comandaReturn);
		// });
	},
	// ENDPOINT POST - AÑADIR COMANDA
	addComandas: function (req, res) {

		// Log para saber que estamos dentro
		console.log('Add comanda');

		// Pasamos datos de la llamada a variables
		const comanda = req.body;
		const { camarero, productos } = comanda;

		// Instanciamos una nueva comanda
        const newComanda = new Comanda();

		// Pasamos valores a la nueva comanda
        newComanda.camarero = camarero;
		newComanda.productos =  productos;

		

		// Leemos comandas existentes en comandas.db
		fs.readFile('../comandas.db', {encoding: 'utf-8'}, (err, data) => {
			if (err) throw new Error ('Error al leer el archivo comandas.db');

			// Parseamos comandas.db a un objeto
			let listaComandas = JSON.parse(data);

			// Consultamos cuantas comandas hay en comandas.db
			const numComandas = Object.keys(listaComandas).length;

			// Estructuramos nueva comandas
			const newComanda = {
				id : numComandas + 1,
				camarero : camarero,
				date : new Date(),
				productos : productos,
				completa: false
			};

			// Añadimos nueva comanda a la lista de comandas y las pasamos a string
			// para actualizar la base
			listaComandas = {...listaComandas, [newComanda.id] : newComanda };
			listaComandas = JSON.stringify(listaComandas);

			// Escribimos el archivo nuevo de comandas.db
			fs.writeFile('../comandas.db', listaComandas, {flag: 'w'}, (err) =>{
				if (err) throw new Error ('No se ha podido actualizar comandas.db');
			});

			// Responder al cliente que todo funcionó guay.
			res.json(`Se ha añadido comanda num ${numComandas + 1}`);
		});



		// console.log('Add comanda')
		// const newComanda = new Comanda();
		// newComanda.camarero = 'Horse Luis';
		// newComanda.safe((err, savedInfo)=>{
		// 	if (err) throw new Error ('Ha ocurrido un error');
		// 	res.send('Comanda añadida');
		// });
		
	}
};

module.exports = comandasController;