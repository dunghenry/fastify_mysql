const userController = require('../controllers/user.controller');
const {
    verifyToken,
    verifyTokenAndUserAuthorization,
} = require('../middleware/verifyToken');
function userRoute(fastify, _, done) {
    fastify.get('/', { preHandler: [verifyToken] }, userController.getUsers);
    fastify.get(
        '/:id',
        { preHandler: [verifyTokenAndUserAuthorization] },
        userController.getUser,
    );
    fastify.put(
        '/:id',
        { preHandler: [verifyTokenAndUserAuthorization] },
        userController.updateUser,
    );
    fastify.delete(
        '/:id',
        { preHandler: [verifyTokenAndUserAuthorization] },
        userController.deleteUser,
    );
    done();
}

module.exports = userRoute;
