const db = require('../config/database');

// Obtener todos los usuarios
const getAllUsuarios = async () => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    return result;
  } catch (error) {
    console.error('Error al obtener todos los usuarios:', error);
    throw new Error('Error al obtener todos los usuarios');
  }
};

// Obtener un usuario por su ID
const getUsuarioById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw new Error(`Error al obtener el usuario con ID ${id}`);
  }
};

// Obtener un usuario por su email
const getUsuarioByEmail = async (email) => {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return result[0];
  } catch (error) {
    console.error('Error al obtener el usuario con email ${email}:', error);
    throw new Error('Error al obtener el usuario con email ${email}');
  }
};

// Registrar un nuevo usuario
const registrarUsuario = async (usuario) => {
  const { clave, nombre, apellido, fechaNacimiento, email, genero, telefono } = usuario;
  try {
    const result = await db.query(
      'INSERT INTO usuarios (clave, nombre, apellido, fechaNacimiento, email, genero, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [clave, nombre, apellido, fechaNacimiento, email, genero, telefono]
    );
    return result;
  } catch (error) {
    console.error('Error al agregar un usuario:', error);
    throw new Error('Error al agregar un usuario');
  }
};

// Editar un usuario existente
const editarUsuario = async (id, usuario) => {
  const { clave, nombre, apellido, fechaNacimiento, email, genero, telefono } = usuario;
  try {
    await db.query(
      'UPDATE usuarios SET clave = ?, nombre = ?, apellido = ?, fechaNacimiento = ?, email = ?, genero = ?, telefono = ? WHERE id = ?',
      [clave, nombre, apellido, fechaNacimiento, email, genero, telefono, id]
    );
  } catch (error) {
    console.error(`Error al editar el usuario con ID ${id}:`, error);
    throw new Error(`Error al editar el usuario con ID ${id}`);
  }
};

// Eliminar un usuario
const deleteUsuario = async (id) => {
  try {
    await db.query('DELETE FROM usuarios WHERE id = ?', [id]);
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw new Error(`Error al eliminar el usuario con ID ${id}`);
  }
};


module.exports = {
  getAllUsuarios,
  getUsuarioById,
  getUsuarioByEmail,
  registrarUsuario,
  editarUsuario,
  deleteUsuario
};

