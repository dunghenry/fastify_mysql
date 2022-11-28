const userController = require('../controllers/user.controller');
function userRoute(fastify, _, done) {
    fastify.get('/', userController.getUsers);
    done();
}

module.exports = userRoute;
