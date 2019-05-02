module.exports = app => {
  const {checkToken} = require('../middleware/');
  const controller = require('../controllers/score.controller.js');
  app.post('/score', checkToken, controller.create);
  app.get('/score', checkToken, controller.findAll);
  app.get('/score/:scoreId', checkToken, controller.findOne);
  app.put('/score/:scoreId', checkToken, controller.update);
  app.delete('/score/:scoreId', checkToken, controller.delete);
};
