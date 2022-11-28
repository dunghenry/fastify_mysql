const fastify = require('fastify')({
    logger: true,
});
const dotenv = require('dotenv');
const colors = require('colors');
const { sequelize } = require('./configs/connect.db');
dotenv.config();
sequelize.sync();
fastify.register(require('./routes/user.route'), { prefix: '/api/users' });
fastify.register(require('./routes/auth.route'), { prefix: '/api/auth' });
// Test route
fastify.get('/', function (request, reply) {
    reply.status(200).send({ msg: 'Hello' });
});
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // fastify.log.info(`Server listening on ${address}`);
    console.log(colors.green(`Server listening on ${address}`));
});
