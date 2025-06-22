const fs = require('fs');
const path = require('path');


const dbPath = path.join(__dirname, '../db.json');

const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
  
    if (err.code === 'ENOENT') {
      const initialData = { students: [] };
      fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    throw err;
  }
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const StudentRepository = {
  async findAll() {
    const db = readDB();
    return db.students;
  },

  async findById(id) {
    const db = readDB();
    return db.students.find(s => s.id == id); 
  },

  async create(studentData) {
    const db = readDB();
    const newStudent = { 
      id: Date.now(), 
      ...studentData,
      grades: studentData.grades.map(Number),
      attendance: Number(studentData.attendance)
    };
    
    db.students.push(newStudent);
    writeDB(db);
    return newStudent;
  },

  async update(id, studentData) {
    const db = readDB();
    const index = db.students.findIndex(s => s.id == id);
    
    if (index === -1) throw new Error('Aluno não encontrado');
    
    const updatedStudent = { 
      ...db.students[index], 
      ...studentData,
      id: db.students[index].id 
    };
    
    db.students[index] = updatedStudent;
    writeDB(db);
    return updatedStudent;
  },

  async delete(id) {
    const db = readDB();
    const index = db.students.findIndex(s => s.id == id);
    
    if (index === -1) throw new Error('Aluno não encontrado');
    
    db.students.splice(index, 1);
    writeDB(db);
  }
};

module.exports = StudentRepository;