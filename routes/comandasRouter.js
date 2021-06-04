// Importamos express
const express =  require('express');

// Importamos nuestro controlador 
const comandasController = require('../controllers/comandasController.js');

// Instanciamos un router
const router = express.Router();

// Definimos que controladores se van a encargar de las peticiones segun tipo y url
router.get('/', comandasController.getComandas);
router.get('/:id', comandasController.getComandaId);
router.post('/add', comandasController.addComandas);

// Exportamos el router
module.exports = router;