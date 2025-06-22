const StudentRepository = require('../repositories/StudentRepository');

const ReportService = {
  calculateStudentAverage(grades) {
    const sum = grades.reduce((acc, grade) => acc + grade, 0);
    return parseFloat((sum / grades.length).toFixed(2));
  },

  calculateClassReports(students) {
    if (students.length === 0) {
      return {
        classAverageBySubject: [0, 0, 0, 0, 0],
        overallClassAverage: 0,
        studentsAboveAverage: [],
        studentsBelowAttendance: []
      };
    }

    const classAverageBySubject = [];
    for (let i = 0; i < 5; i++) {
      const sum = students.reduce((acc, student) => acc + student.grades[i], 0);
      classAverageBySubject.push(parseFloat((sum / students.length).toFixed(2)));
    }

    const totalSum = students.reduce((acc, student) => {
      return acc + this.calculateStudentAverage(student.grades);
    }, 0);
    const overallClassAverage = parseFloat((totalSum / students.length).toFixed(2));

    const studentsAboveAverage = students.filter(student => {
      return this.calculateStudentAverage(student.grades) > overallClassAverage;
    });

    const studentsBelowAttendance = students.filter(student => student.attendance < 75);

    return {
      classAverageBySubject,
      overallClassAverage,
      studentsAboveAverage,
      studentsBelowAttendance
    };
  },

  async getClassReports() {
    const students = await StudentRepository.findAll();
    return this.calculateClassReports(students);
  },

  async getFormattedOutput() {
    const students = await StudentRepository.findAll();
    
    let output = '';
    
    students.forEach(student => {
      const avg = this.calculateStudentAverage(student.grades);
      output += `${student.name} ${avg} ${student.attendance}%\n`;
    });

    if (students.length > 0) {
      const reports = this.calculateClassReports(students);
      output += `\nMédias por disciplina: ${reports.classAverageBySubject.join(' ')}\n`;
      output += `\nAlunos acima da média da turma:\n`;
      output += reports.studentsAboveAverage.length > 0 
        ? reports.studentsAboveAverage.map(s => s.name).join(', ') + '\n'
        : '\n';
      output += `\nAlunos com frequência abaixo de 75%:\n`;
      output += reports.studentsBelowAttendance.length > 0 
        ? reports.studentsBelowAttendance.map(s => s.name).join(', ') + '\n'
        : '\n';
    }

    return output;
  }
};

module.exports = ReportService;