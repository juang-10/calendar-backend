const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const router = Router();


// Todas tienen que pasar por la validación del token
// Obtener eventos

router.use( validateJWT );

router.get('/', getEvent);

// Crear un nuevo evento
router.post('/', createEvent);

// Actualizar evento
router.put('/:id', updateEvent);

// Borrar evento
router.delete('/:id', deleteEvent);

module.exports = router;