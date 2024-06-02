const usuarioModel = require('../models/usuarioModel');

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const usuario = await usuarioModel.getAllUsuarios();
    res.render('../views/usuario/listar', { usuario });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los usuarios');
  }
};

// Obtener un usuario por su id
const getUsuarioById = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await usuarioModel.getUsuarioById(id);
    if (usuario) {
      res.render('/views/usuario/editar', { usuario });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario');
  }
};

// Mostrar formulario de registro de usuarios
const showRegistrarForm = (req, res) => {
  res.render('../views/usuario/registrar');
};

// Registrar un nuevo usuario
const registrarUsuario = async (req, res) => {
  const usuario = req.body;
  try {
    await usuarioModel.registrarUsuario(usuario);
    res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el usuario');
  }
};

// Mostrar formulario de edición de usuarios
const showEditarForm = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await usuarioModel.getUsuarioById(id);
    if (usuario) {
      res.render('../views/usuario/editar', { usuario });
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el usuario');
  }
};

// Editar un usuario
const editarUsuario = async (req, res) => {
  const id = req.params.id;
  const usuario = req.body;
  try {
    await usuarioModel.editarUsuario(id, usuario);
    res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al editar el usuario');
  }
};

// Eliminar un usuario
const eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    await usuarioModel.deleteUsuario(id);
    res.redirect('/usuario');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
};

// Mostrar formulario de inicio de sesión
const showLoginForm = (req, res) => {
  res.render('../views/usuario/login');
};

// Procesar inicio de sesión
const login = async (req, res) => {
  const { email, clave } = req.body;
  try {
    const usuario = await usuarioModel.getUsuarioByEmail(email);
    if (usuario && usuario.clave === clave) {
      req.session.usuario = usuario; // Guardar el usuario en la sesión
      res.redirect('/usuario/login');
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión');
  }
};


// Cerrar sesión
const logout = (req, res) => {
  req.session.usuario = null; // Eliminar el usuario de la sesión
  res.redirect('/');
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  showRegistrarForm,
  registrarUsuario,
  showEditarForm,
  editarUsuario,
  eliminarUsuario,
  showLoginForm,
  login,
  logout
};

