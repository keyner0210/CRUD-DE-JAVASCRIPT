const mysql = require("mysql");

// Configuración de la conexión a la base de datos MySQL usando variables de entorno
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "crud_js",
  connectionLimit: 10, // Pool de conexiones
};

// Crear un pool de conexiones a la base de datos
const pool = mysql.createPool(dbConfig);

// Método para ejecutar consultas
const query = async (queryText, queryParams) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error al obtener la conexión a la base de datos: ", err);
        reject(err);
      }

      connection.query(queryText, queryParams, (error, results) => {
        if (error) {
          console.error("Error en la consulta a la base de datos: ", error);
          reject(error);
        } else {
          resolve(results);
        }
        connection.release();
      });
    });
  });
};

// Función para registrar un nuevo usuario en la base de datos
const registrarUsuario = (usuario, callback) => {
  const queryText =
    "INSERT INTO usuario (Id, clave, nombre, apellido, fechaNacimiento, email, genero, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const queryParams = [
    usuario.Id,
    usuario.clave,
    usuario.nombre,
    usuario.apellido,
    usuario.fechaNacimiento,
    usuario.email,
    usuario.genero,
    usuario.telefono,
  ];

  query(queryText, queryParams, callback);
};

// Función para agregar una nuevo estudiante en la base de datos
const agregarEstudiante = (estudiante, callback) => {
  const queryText =
    "INSERT INTO estudiantes (usuario_id, carrera, semestre, universidad) VALUES (?, ?, ?, ?)";
  const queryParams = [
    estudiante.usuario_id,
    estudiante.carrera,
    estudiante.semestre,
    estudiante.universidad,
   
  ];

  query(queryText, queryParams, callback);
};

// Prueba de conexión inicial
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
    return;
  }
  console.log("Conexión exitosa a la base de datos MySQL");
  connection.release(); // Liberar la conexión después de usarla
});

module.exports = {
  query,
  registrarUsuario, // Exportar la función registrarUsuario
  agregarEstudiante, // Exportar la función agregarEstudiante
};
