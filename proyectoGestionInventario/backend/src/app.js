const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/models/index.cjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error al conectar DB:', err);
  });