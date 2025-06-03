const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');
const Task = require('../models/Task'); 


router.get('/api', (req, res) => { 
  res.status(200).json({
    success: true,
    message: 'API de Gerenciamento de Tarefas funcionando corretamente',
    endpoints: {
      'GET /api/tasks': 'Listar todas as tarefas',
      'GET /api/tasks/:id': 'Buscar uma tarefa específica',
      'POST /api/tasks': 'Criar uma nova tarefa',
      'PUT /api/tasks/:id': 'Atualizar uma tarefa existente',
      'DELETE /api/tasks/:id': 'Excluir uma tarefa',
      'GET /view/tasks': 'Visualizar tarefas em HTML (EJS)'
    }
  });
});


router.get('/view/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();

    res.render('tasks', { tasks: tasks || [] });
  } catch (error) {
    console.error('Erro ao carregar tarefas para view:', error);
    res.status(500).render('tasks', { tasks: [], error: 'Erro ao carregar tarefas.' });
  }
});

// Rotas da API para tarefas
router.get('/api/tasks', TaskController.listTasks);
router.get('/api/tasks/:id', TaskController.getTask);
router.post('/api/tasks', TaskController.createTask);
router.put('/api/tasks/:id', TaskController.updateTask);
router.delete('/api/tasks/:id', TaskController.deleteTask);

module.exports = router;