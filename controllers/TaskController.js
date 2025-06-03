const Task = require('../models/Task');

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
      
      if (!title) {
        return res.status(400).json({
          success: false,
          message: 'O título da tarefa é obrigatório'
        });
      }
      
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
      
      const taskToUpdate = {};
      if (title !== undefined) taskToUpdate.title = title;
      if (description !== undefined) taskToUpdate.description = description;
      if (status !== undefined) taskToUpdate.status = status;

      if (Object.keys(taskToUpdate).length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Nenhum dado fornecido para atualização'
        });
      }

      const updatedTask = await Task.update(taskId, taskToUpdate);
      
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Tarefa não encontrada para atualização'
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
          message: 'Tarefa não encontrada para exclusão'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Tarefa excluída com sucesso',

        data: { id: taskId, deleted: true } 
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