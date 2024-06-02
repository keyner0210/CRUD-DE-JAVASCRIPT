const estudianteModel = require('../models/estudianteModel');

// Obtener todos los estudiantes
const getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await estudianteModel.getAllEstudiantes();
    res.render('../views/estudiante/listar', { estudiantes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener los estudiantes');
  }
};

// Obtener un estudiante por su id
const getEstudianteById = async (req, res) => {
  const id = req.params.id;
  try {
    const estudiante = await estudianteModel.getEstudianteById(id);
    if (estudiante) {
      res.render('/views/estudiante/editar', { estudiante });
    } else {
      res.status(404).send('Estudiante no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el estudiante');
  }
};

// Mostrar formulario de agregar estudiante
const showAgregarForm = (req, res) => {
  res.render('../views/estudiante/agregar');
};

// Agregar un nuevo estudiante
const agregarEstudiante = async (req, res) => {
  const estudiante = req.body;
  try {
    await estudianteModel.addEstudiante(estudiante);
    res.redirect('/estudiante/listar');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el estudiante');
  }
};

// Mostrar formulario de edición de estudiante
const showEditarForm = async (req, res) => {
  const id = req.params.id;
  try {
    const estudiante = await estudianteModel.getEstudianteById(id);
    if (estudiante) {
      res.render('../views/estudiante/editar', { estudiante });
    } else {
      res.status(404).send('Estudiante no encontrado');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el estudiante');
  }
};

// Editar un estudiante
const editarEstudiante = async (req, res) => {
  const id = req.params.id;
  const estudiante = req.body;
  try {
    await estudianteModel.editEstudiante(id, estudiante);
    res.redirect('/estudiante/listar');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al editar el estudiante');
  }
};

// Eliminar un estudiante
const eliminarEstudiante = async (req, res) => {
  const id = req.params.id;
  try {
    await estudianteModel.deleteEstudiante(id);
    res.redirect("/estudiante/listar");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al eliminar el estudiante");
  }
};


module.exports = {
  getAllEstudiantes,
  getEstudianteById,
  showAgregarForm,
  agregarEstudiante,
  showEditarForm,
  editarEstudiante,
  eliminarEstudiante
};
