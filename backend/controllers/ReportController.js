const ReportService = require('../services/ReportService');

const ReportController = {
  async getClassReports(req, res) {
    try {
      const reports = await ReportService.getClassReports();
      res.json(reports);
    } catch (error) {
      console.error('Erro ao gerar relatórios:', error);
      res.status(500).json({ error: 'Erro ao gerar relatórios' });
    }
  },

  async getFormattedOutput(req, res) {
    try {
      const output = await ReportService.getFormattedOutput();
      res.json({ output });
    } catch (error) {
      console.error('Erro ao gerar saída formatada:', error);
      res.status(500).json({ error: 'Erro ao gerar saída formatada' });
    }
  }
};

module.exports = ReportController;