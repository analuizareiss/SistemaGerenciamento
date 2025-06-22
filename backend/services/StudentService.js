const StudentRepository = require('../repositories/StudentRepository');

const StudentService = {
  async getAllStudents() {
    return await StudentRepository.findAll();
  },

  async createStudent(studentData) {
    this.validateStudentData(studentData);
    return await StudentRepository.create(studentData);
  },

  async updateStudent(id, studentData) {
    if (!id) throw new Error('ID é obrigatório'); 
    this.validateStudentData(studentData);
    const existingStudent = await StudentRepository.findById(id);
    if (!existingStudent) {
      throw new Error('Aluno não encontrado');
    }
    return await StudentRepository.update(id, studentData);
  },

  async deleteStudent(id) {
    const existingStudent = await StudentRepository.findById(id);
    if (!existingStudent) {
      throw new Error('Aluno não encontrado');
    }
    await StudentRepository.delete(id);
  },

  validateStudentData({ name, grades, attendance }) {
    if (!name || !name.trim()) {
      throw new Error('Nome é obrigatório');
    }

    if (!grades || !Array.isArray(grades)) {
      throw new Error('Notas devem ser um array');
    }

    const numericGrades = grades.map(g => parseFloat(g));
    if (numericGrades.some(g => isNaN(g)) || numericGrades.some(g => g < 0 || g > 10)) {
      throw new Error('Notas devem estar entre 0 e 10');
    }

    if (attendance === undefined || attendance === null) {
      throw new Error('Frequência é obrigatória');
    }

    const numericAttendance = parseFloat(attendance);
    if (isNaN(numericAttendance) || numericAttendance < 0 || numericAttendance > 100) {
      throw new Error('Frequência deve estar entre 0 e 100');
    }
  }
};

module.exports = StudentService;