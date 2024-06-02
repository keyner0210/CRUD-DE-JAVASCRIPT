const express = require('express');
const session = require('express-session');
const path = require('path');

// Importar las rutas de propietarios y fincas
const usuarioRoutes = require('./routes/usuarioRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();

// Configurar el motor de plantillas (asumiendo que estás usando EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para analizar el cuerpo de las solicitudes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar las sesiones
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Usar las rutas importadas
app.get("/", (req, res) => {
  // Suponiendo que utilizas sesiones para almacenar el estado de autenticación
  const loggedIn = req.session.loggedIn || false; // Asegúrate de que 'loggedIn' esté definida
  res.render('index', { loggedIn });
});

app.use('/usuario', usuarioRoutes);
app.use('/estudiante', estudianteRoutes);

// Iniciar el servidor
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
