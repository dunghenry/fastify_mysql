const fastify = require('fastify')({
    logger: true,
});
const { sequelize } = require('./configs/connect.db');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');
(async () => {
    await sequelize.sync({ force: true });
})();
fastify.register(require('./routes/user.route'), { prefix: '/api/users' });
fastify.get('/', function (request, reply) {
    reply.send({ msg: 'Hello' });
});
fastify.listen({ port: 3000, host: '0.0.0.0' }, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // fastify.log.info(`Server listening on ${address}`);
    console.log(colors.green(`Server listening on ${address}`));
});
