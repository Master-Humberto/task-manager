
const Task = require('../models/Task');

// cria a o controller do sistema de tarefas 
class TaskController {
  // lista as tarefas
  static async listTasks(req, res) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json({
        success: true,
        message: 'Tarefas recuperadas com sucesso',
        data: tasks
      });
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao recuperar tarefas',
        error: error.message
      });
    }
  }

  // pega uma tarefa
  static async getTask(req, res) {
    try {
      const taskId = req.params.id;
      const task = await Task.findById(taskId);
      
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Tarefa recuperada com sucesso',
        data: task
      });
    } catch (error) {
      console.error(`Erro ao buscar tarefa:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar tarefa',
        error: error.message
      });
    }
  }

  // cria uma tarefa
  static async createTask(req, res) {
    try {
      const { title, description, status } = req.body;
      
      // Validação básica
      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'O título da tarefa é obrigatório'
        });
      }
      
      // Criar a tarefa
      const task = await Task.create({
        title,
        description,
        status: status || 'pendente'
      });
      
      res.status(201).json({
        success: true,
        message: 'Tarefa criada com sucesso',
        data: task
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({
        success: false,
        message: 'Erro ao criar tarefa',
        error: error.message
      });
    }
  }

  // atualiza uma tarefa
  static async updateTask(req, res) {
    try {
      const taskId = req.params.id;
      const { title, description, status } = req.body;
      
      // Validação básica
      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'O título da tarefa é obrigatório'
        });
      }
      
      // Atualizar a tarefa
      const updatedTask = await Task.update(taskId, {
        title,
        description,
        status
      });
      
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Tarefa atualizada com sucesso',
        data: updatedTask
      });
    } catch (error) {
      console.error(`Erro ao atualizar tarefa:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao atualizar tarefa',
        error: error.message
      });
    }
  }

  // deleta uma tarefa
  static async deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const deleted = await Task.delete(taskId);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Tarefa excluída com sucesso',
        data: { id: taskId }
      });
    } catch (error) {
      console.error(`Erro ao excluir tarefa:`, error);
      res.status(500).json({
        success: false,
        message: 'Erro ao excluir tarefa',
        error: error.message
      });
    }
  }
}

module.exports = TaskController;
