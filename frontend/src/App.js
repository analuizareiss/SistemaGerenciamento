import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { 
  fetchStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from './services/apiService';
import HomePage from './pages/HomePage';
import StudentFormPage from './pages/StudentFormPage';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  
  const [newStudent, setNewStudent] = useState({
    name: '',
    grades: ['', '', '', '', ''],
    attendance: ''
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      alert('Erro de conexão. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    
    if (!validateStudent(newStudent)) return;

    try {
      setLoading(true);
      await createStudent(newStudent);
      await loadStudents();
      setNewStudent({ name: '', grades: ['', '', '', '', ''], attendance: '' });
      alert('Aluno adicionado!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    
    if (!validateStudent(editingStudent)) return;

    try {
      setLoading(true);
      await updateStudent(editingStudent.id, editingStudent);
      await loadStudents();
      setEditingStudent(null);
      alert('Aluno atualizado!');
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveStudent = async (id) => {
    if (!window.confirm('Remover este aluno?')) return;

    try {
      setLoading(true);
      await deleteStudent(id);
      await loadStudents();
      alert('Aluno removido!');
    } catch (error) {
      alert('Erro ao remover aluno');
    } finally {
      setLoading(false);
    }
  };

  const validateStudent = (student) => {
    if (!student?.name?.trim()) {
      alert('Nome é obrigatório');
      return false;
    }

    if (student.grades.some(g => g === '' || isNaN(g)) || student.attendance === '') {
      alert('Preencha todas as notas e frequência');
      return false;
    }

    return true;
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Sistema de Gerenciamento de Alunos</h1>
          <p>Professor Carlos - Organize notas e frequência</p>
          <nav className="main-nav">
            <Link to="/" className="nav-link">Home</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                {editingStudent ? (
                  <StudentFormPage
                    student={editingStudent}
                    onSubmit={handleEditStudent}
                    onCancel={() => setEditingStudent(null)}
                    onChange={(field, value) => setEditingStudent({...editingStudent, [field]: value})}
                    isEditing={true}
                    loading={loading}
                  />
                ) : (
                  <StudentFormPage
                    student={newStudent}
                    onSubmit={handleAddStudent}
                    onChange={(field, value) => setNewStudent({...newStudent, [field]: value})}
                    isEditing={false}
                    loading={loading}
                  />
                )}

                <HomePage
                  students={students}
                  setStudents={setStudents}
                  onEditStudent={(student) => setEditingStudent({
                    id: student.id,
                    name: student.name,
                    grades: [...student.grades],
                    attendance: student.attendance
                  })}
                  onDeleteStudent={handleRemoveStudent}
                  loading={loading}
                  setLoading={setLoading}
                />
              </>
            } />
          </Routes>
        </main>

        <footer className="footer">
          <p>Sistema desenvolvido para a Escola XYZ - {new Date().getFullYear()}</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;