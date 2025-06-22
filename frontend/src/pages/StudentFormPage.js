import React from 'react';
import StudentForm from '../components/StudentForm/StudentForm';

const StudentFormPage = ({ 
  student, 
  onSubmit, 
  onCancel, 
  onChange, 
  isEditing, 
  loading 
}) => {
  return (
    <section className="form-section">
      <h2>{isEditing ? '✏️ Editar Aluno' : '📝 Adicionar Novo Aluno'}</h2>
      <StudentForm 
        student={student}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onChange={onChange}
        isEditing={isEditing}
        loading={loading}
      />
    </section>
  );
};

export default StudentFormPage;