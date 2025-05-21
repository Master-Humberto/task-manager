// models/Task.js
const pool = require('../config/database');

// classe do modelos ds tarefas
class Task {
  // acha todas as tarefas
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  }

  // acha a tarefa pelo id
  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Erro ao buscar tarefa com ID ${id}:`, error);
      throw error;
    }
  }

  // cria uma tarefa
  static async create(taskData) {
    try {
      const { title, description, status } = taskData;
      const query = `
        INSERT INTO tasks (title, description, status)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const values = [title, description, status || 'pendente'];
      
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }

  // atualiza uma tarefa  
  static async update(id, taskData) {
    try {
      const { title, description, status } = taskData;
      const query = `
        UPDATE tasks
        SET title = $1, description = $2, status = $3, updated_at = NOW()
        WHERE id = $4
        RETURNING *
      `;
      const values = [title, description, status, id];
      
      const result = await pool.query(query, values);
      return result.rows.length ? result.rows[0] : null;
    } catch (error) {
      console.error(`Erro ao atualizar tarefa com ID ${id}:`, error);
      throw error;
    }
  }

  // deleta uma tarefa
  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING id', [id]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Erro ao excluir tarefa com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Task;
