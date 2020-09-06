const publicRoutes = {
  'POST /mutant/': 'MutantController.checkDna',
  'GET /stats': 'MutantController.getStats',
};

module.exports = publicRoutes;
