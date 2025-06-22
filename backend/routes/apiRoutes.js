const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/StudentController');
const ReportController = require('../controllers/ReportController');


router.get('/students', StudentController.getAllStudents);
router.post('/students', StudentController.createStudent);
router.put('/students/:id', StudentController.updateStudent);
router.delete('/students/:id', StudentController.deleteStudent);


router.get('/reports', ReportController.getClassReports);
router.get('/formatted-output', ReportController.getFormattedOutput);


router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando'
  });
});

module.exports = router;