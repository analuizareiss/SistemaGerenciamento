import React from 'react';
import { calculateAverage } from '../../services/apiService';

const StudentList = ({ 
  students, 
  onEdit, 
  onDelete, 
  onToggleReports, 
  showReports, 
  loading 
}) => {
  return (
    <div className="students-section">
      <h2>👥 Turma ({students.length})</h2>
      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Disciplina 1</th>
              <th>Disciplina 2</th>
              <th>Disciplina 3</th>
              <th>Disciplina 4</th>
              <th>Disciplina 5</th>
              <th>Média</th>
              <th>Frequência</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td><strong>{student.name}</strong></td>
                {student.grades.map((grade, index) => (
                  <td key={index}>{parseFloat(grade).toFixed(1)}</td>
                ))}
                <td className={calculateAverage(student.grades) >= 6 ? 'grade-good' : 'grade-bad'}>
                  <strong>{calculateAverage(student.grades)}</strong>
                </td>
                <td className={student.attendance >= 75 ? 'attendance-good' : 'attendance-bad'}>
                  {student.attendance}%
                </td>
                <td>
                  <button 
                    onClick={() => onEdit(student)}
                    className="btn-edit"
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(student.id)}
                    className="btn-danger"
                    disabled={loading}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button 
        onClick={onToggleReports}
        disabled={loading}
        className="btn-secondary"
      >
        📊 {showReports ? 'Ocultar' : 'Mostrar'} Relatórios
      </button>
    </div>
  );
};

export default StudentList;