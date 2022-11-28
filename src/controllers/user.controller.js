const User = require('../models/user.model');
const userController = {
    getUsers: async (req, reply) => {
        try {
            const users = await User.findAll();
            return reply.send(users);
        } catch (error) {
            console.log(error);
            return reply.send(error);
        }
    },
};
module.exports = userController;
