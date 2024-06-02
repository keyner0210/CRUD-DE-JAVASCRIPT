const db = require('../config/database'); // Suponiendo que tienes un módulo de base de datos configurado

// Obtener todos los estudiantes
const getAllEstudiantes = async () => {
  try {
    const result = await db.query('SELECT * FROM estudiantes');
    return result;
  } catch (error) {
    console.error('Error al obtener todos los estudiantes:', error);
    throw new Error('Error al obtener todos los estudiantes');
  }
};

// Obtener un estudiante por su ID de usuario
const getEstudianteById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
    return result[0];
  } catch (error) {
    console.error(`Error al obtener el estudiante con id ${id}:`, error);
    throw new Error(`Error al obtener el estudiante con id ${id}`);
  }
};

// Agregar un nuevo estudiante
const addEstudiante = async (estudiante) => {
  const { usuario_id, semestre, carrera, universidad } = estudiante;
  try {
    const result = await db.query(
      'INSERT INTO estudiantes (usuario_id, semestre, carrera, universidad) VALUES (?, ?, ?, ?) ',
      [usuario_id, semestre, carrera, universidad]
    );
    return result;
  } catch (error) {
    console.error('Error al agregar un estudiante:', error);
    throw new Error('Error al agregar un estudiante');
  }
};

// Editar un estudiante existente
const editEstudiante = async (id, estudiante) => {
  const { usuario_id, semestre, carrera, universidad } = estudiante;
  const query = "UPDATE estudiantes SET usuario_id = ?, semestre = ?, carrera = ?, universidad = ? WHERE id = ?";
  await db.query(query, [usuario_id, semestre, carrera, universidad, id]);
};

// Eliminar un estudiante
const deleteEstudiante = async (id) => {
  try {
    await db.query("DELETE FROM estudiantes WHERE id = ?", [id]);
  } catch (error) {
    console.error('Error al eliminar la estudiante con ID ${id}:', error);
    throw new Error('Error al eliminar la estudiante con ID ${id}');
  }
};


module.exports = {
  getAllEstudiantes,
  getEstudianteById,
  addEstudiante,
  editEstudiante,
  deleteEstudiante
};


