const StudentService = require('../services/StudentService');

const StudentController = {
  async getAllStudents(req, res) {
    try {
      const students = await StudentService.getAllStudents();
      res.json(students);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      res.status(500).json({ error: 'Erro ao buscar alunos' });
    }
  },

  async createStudent(req, res) {
    try {
      const student = await StudentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error);
      res.status(500).json({ error: error.message || 'Erro ao salvar aluno' });
    }
  },

  async updateStudent(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ error: 'ID é obrigatório' });
      }
      const student = await StudentService.updateStudent(req.params.id, req.body);
      res.json(student);
    } catch (error) {
      if (error.message === 'Aluno não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Erro ao atualizar aluno:', error);
      res.status(500).json({ error: error.message || 'Erro ao atualizar aluno' });
    }
  },

  async deleteStudent(req, res) {
    try {
      await StudentService.deleteStudent(req.params.id);
      res.json({ message: 'Aluno removido com sucesso' });
    } catch (error) {
      if (error.message === 'Aluno não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      console.error('Erro ao remover aluno:', error);
      res.status(500).json({ error: 'Erro ao remover aluno' });
    }
  }
};

module.exports = StudentController;