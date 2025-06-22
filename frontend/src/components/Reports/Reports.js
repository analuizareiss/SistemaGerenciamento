import React from 'react';
import { calculateAverage } from '../../services/apiService';

const Reports = ({ reports }) => {
  return (
    <div className="reports-section">
      <h2>📈 Relatórios e Estatísticas</h2>
      
      <div className="report-card">
        <h3>📚 Médias por Disciplina:</h3>
        {reports.classAverageBySubject.map((avg, index) => (
          <div key={index} className="subject-average">
            <strong>Disciplina {index + 1}:</strong> {avg}
          </div>
        ))}
        <div className="overall-average">
          <strong>Média Geral da Turma: {reports.overallClassAverage}</strong>
        </div>
      </div>

      <div className="report-card">
        <h3>⭐ Alunos Acima da Média da Turma:</h3>
        {reports.studentsAboveAverage.length > 0 ? (
          reports.studentsAboveAverage.map(student => (
            <div key={student.id} className="student-highlight">
              <strong>{student.name}</strong> - Média: {calculateAverage(student.grades)}
            </div>
          ))
        ) : (
          <p className="no-data">Nenhum aluno acima da média da turma</p>
        )}
      </div>

      <div className="report-card alert">
        <h3>⚠️ Alunos com Frequência Abaixo de 75%:</h3>
        {reports.studentsBelowAttendance.length > 0 ? (
          reports.studentsBelowAttendance.map(student => (
            <div key={student.id} className="student-warning">
              <strong>{student.name}</strong> - Frequência: {student.attendance}%
            </div>
          ))
        ) : (
          <p className="no-data">Todos os alunos com frequência adequada</p>
        )}
      </div>
    </div>
  );
};

export default Reports;