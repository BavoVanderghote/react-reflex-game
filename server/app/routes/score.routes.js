module.exports = app => {
  // const {checkToken} = require('../middleware/');
  const controller = require('../controllers/score.controller.js');
  app.post('/score', controller.create);
  app.get('/score', controller.findAll);
  app.get('/score/:scoreId', controller.findOne);
  app.put('/score/:scoreId', controller.update);
  app.delete('/score/:scoreId', controller.delete);
};
