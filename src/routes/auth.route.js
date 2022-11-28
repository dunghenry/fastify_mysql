const authController = require('../controllers/auth.controller');
function authRoute(fastify, _, done) {
    fastify.post('/register', authController.register);
    fastify.post('/login', authController.login);
    done();
}
module.exports = authRoute;
