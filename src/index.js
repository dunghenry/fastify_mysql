const fastify = require('fastify')({
    logger: true,
});
const colors = require('colors');
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
