const API_URL = 'http://localhost:3001/api';

export const fetchStudents = async () => {
  const response = await fetch(`${API_URL}/students`);
  if (!response.ok) throw new Error('Erro ao buscar alunos');
  return response.json();
};

export const createStudent = async (studentData) => {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const updateStudent = async (id, studentData) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const deleteStudent = async (id) => {
  const response = await fetch(`${API_URL}/students/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Erro ao remover aluno');
};

export const fetchReports = async () => {
  const response = await fetch(`${API_URL}/reports`);
  if (!response.ok) throw new Error('Erro ao buscar relatórios');
  return response.json();
};

export const calculateAverage = (grades) => {
  const sum = grades.reduce((acc, grade) => acc + parseFloat(grade), 0);
  return (sum / grades.length).toFixed(2);
};