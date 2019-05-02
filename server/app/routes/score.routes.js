module.exports = app => {
  const {checkToken} = require('../middleware/');
  const controller = require('../controllers/score.controller.js');
  app.post('/api/score', checkToken, controller.create);
  app.get('/api/score', checkToken, controller.findAll);
  app.get('/api/score/:scoreId', checkToken, controller.findOne);
  app.put('/api/score/:scoreId', checkToken, controller.update);
  app.delete('/api/score/:scoreId', checkToken, controller.delete);
};
