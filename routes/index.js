// routes/index.js
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const Task = require('../models/Task')

// Rota para verificar status da API
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API de Gerenciamento de Tarefas funcionando corretamente',
    endpoints: {
      'GET /api/tasks': 'Listar todas as tarefas',
      'GET /api/tasks/:id': 'Buscar uma tarefa específica',
      'POST /api/tasks': 'Criar uma nova tarefa',
      'PUT /api/tasks/:id': 'Atualizar uma tarefa existente',
      'DELETE /api/tasks/:id': 'Excluir uma tarefa'
    }
  });
});
// Rota para visualização das tarefas (adicione junto com as outras rotas)
router.get('/view/tasks', async (req, res) => {
  try {
    // Buscar tarefas usando o modelo Task
    const tasks = await Task.findAll();
    console.log('Tarefas encontradas:', tasks ? tasks.length : 0);
    
    // Renderizar view com as tarefas
    res.render('tasks', { tasks: tasks || [] });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    // Renderizar view mesmo com erro, mas sem tarefas (mostrará os exemplos)
    res.render('tasks', { tasks: [] });
  }
});


// Rotas para tarefas
router.get('/api/tasks', TaskController.listTasks);
router.get('/api/tasks/:id', TaskController.getTask);
router.post('/api/tasks', TaskController.createTask);
router.put('/api/tasks/:id', TaskController.updateTask);
router.delete('/api/tasks/:id', TaskController.deleteTask);

module.exports = router;
