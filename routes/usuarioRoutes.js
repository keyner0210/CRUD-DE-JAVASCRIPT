const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Mostrar formulario de registro de usuarios
router.get('/registrar', usuarioController.showRegistrarForm);

// Registrar un nuevo usuario
router.post('/registrar', usuarioController.registrarUsuario);

// Mostrar formulario de edición de usuarios
router.get('/editar/:id', usuarioController.showEditarForm);

// Editar un usuario
router.post('/editar/:id', usuarioController.editarUsuario);

// Eliminar un usuario
router.get('/eliminar/:id', usuarioController.eliminarUsuario);

// Mostrar formulario de inicio de sesión
router.get('/login', usuarioController.showLoginForm);

// Procesar inicio de sesión
router.post('/login', usuarioController.login);

// Cerrar sesión
router.get('/logout', usuarioController.logout);

module.exports = router;

