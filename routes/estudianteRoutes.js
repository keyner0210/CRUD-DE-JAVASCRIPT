const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');

// Obtener todos los estudiantes
router.get('/listar', estudianteController.getAllEstudiantes);


// Mostrar formulario de agregar estudiantes
router.get('/agregar', estudianteController.showAgregarForm);

// Agregar un nuevo estudiante
router.post('/agregar', estudianteController.agregarEstudiante);

// Mostrar formulario de edición de estudiantes
router.get('/editar/:id', estudianteController.showEditarForm);

// Editar un estudiante
router.post('/editar/:id', estudianteController.editarEstudiante);

// Eliminar un estudiante
router.get('/eliminar/:id', estudianteController.eliminarEstudiante);

module.exports = router;

