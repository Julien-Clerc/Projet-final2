const controller = require("../controllers/radio.controller");

module.exports = function(app) {

  app.route('/radio')
    .get(controller.get);

  app.route('/radio')
    .post(controller.post);

  app.route('/radio/:id')
    .get(controller.getId);

  app.route('/radio/:id')
    .put(controller.update)

  app.route('/radio/:id')
    .delete(controller.delete)
};