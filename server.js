const express = require('express');
const routes = require('./routes/index'); 
const app = express();

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/', routes);


app.get('/', (req, res) => {
  res.send('<h1>Bem-vindo ao Gerenciador de Tarefas!</h1><p>Acesse <a href="/view/tasks">/view/tasks</a> para ver as tarefas ou <a href="/api">/api</a> para o status da API.</p>');
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`View tasks (EJS) at http://localhost:${PORT}/view/tasks`);
  console.log(`API status at http://localhost:${PORT}/api`);
});