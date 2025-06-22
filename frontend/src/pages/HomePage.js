import React, { useState, useEffect } from 'react';
import { fetchStudents, fetchReports } from '../services/apiService';
import StudentList from '../components/StudentList/StudentList';
import Reports from '../components/Reports/Reports';

const HomePage = ({ 
  onEditStudent, 
  onDeleteStudent, 
  students, 
  setStudents,
  loading,
  setLoading
}) => {
  const [reports, setReports] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleToggleReports = async () => {
    if (!showResults) {
      try {
        setLoading(true);
        const reportsData = await fetchReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
      } finally {
        setLoading(false);
      }
    }
    setShowResults(!showResults);
  };

  return (
    <>
      <StudentList 
        students={students} 
        onEdit={onEditStudent} 
        onDelete={onDeleteStudent}
        onToggleReports={handleToggleReports}
        showReports={showResults}
        loading={loading}
      />
      
      {showResults && reports && <Reports reports={reports} students={students} />}
    </>
  );
};

export default HomePage;