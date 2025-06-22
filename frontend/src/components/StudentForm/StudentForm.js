import React from 'react';

const StudentForm = ({ 
  student, 
  onSubmit, 
  onCancel, 
  onChange, 
  isEditing, 
  loading 
}) => {
  return (
    <form onSubmit={onSubmit} className="student-form">
      <div className="form-group">
        <label>Nome do Aluno:</label>
        <input
          type="text"
          value={student.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Digite o nome"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label>Notas das 5 Disciplinas (0-10):</label>
        <div className="disciplinas-container">
          {student.grades.map((grade, index) => (
            <div key={index} className="disciplina-input">
              <label>Disciplina {index + 1}:</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={grade}
                onChange={(e) => {
                  const newGrades = [...student.grades];
                  newGrades[index] = e.target.value;
                  onChange('grades', newGrades);
                }}
                disabled={loading}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Frequência (0-100%):</label>
        <input
          type="number"
          min="0"
          max="100"
          value={student.attendance}
          onChange={(e) => onChange('attendance', e.target.value)}
          placeholder="Ex: 85"
          disabled={loading}
          className="attendance-input"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" disabled={loading} className="btn-primary">
          {loading 
            ? isEditing ? 'Atualizando...' : 'Adicionando...' 
            : isEditing ? '✔️ Salvar Alterações' : '➕ Adicionar Aluno'}
        </button>
        {isEditing && (
          <button 
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="btn-secondary"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;