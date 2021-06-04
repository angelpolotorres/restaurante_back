// Importamos mongoose
const mongoose = require('mongoose');

// Declaramos la clase Esquema tirando de mongoose
const Schema = mongoose.Schema;

// Instanciamos un nuevo Esquema y definimos sus atributos
const ComandaSchema = new Schema ({
	id: Number,
	camarero: String,
	fecha: Date,
	productos: String,
	completa: Boolean,
});

// Exportamos el modelo de Esquema ComandaSchema con el nombre de Comanda
module.exports = mongoose.model('Comanda', ComandaSchema);