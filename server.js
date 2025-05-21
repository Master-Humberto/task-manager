// server.js
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Importar rotas
const routes = require('./routes/index');
app.use('/', routes);

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
