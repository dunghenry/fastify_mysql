const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const userController = {
    getUsers: async (req, reply) => {
        try {
            const users = await User.findAll();
            const rs = users.map((item) => {
                const { password, ...info } = item.dataValues;
                return info;
            });
            return reply.status(200).send(rs);
        } catch (error) {
            return reply.status(500).send(error);
        }
    },
    getUser: async (req, reply) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return reply.status(404).send({ message: 'User not found' });
            }
            const { password, ...info } = user.dataValues;
            return reply.status(200).send(info);
        } catch (error) {
            return reply.status(500).send(error);
        }
    },
    updateUser: async (req, reply) => {
        const id = req.params.id;
        const { username, email } = req.body;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return reply.status(404).send({ message: 'User not found' });
            }
            const findUser = await User.findOne({ where: { email } });
            if (
                findUser?.dataValues != null &&
                findUser.dataValues.id !== +id
            ) {
                return reply
                    .status(400)
                    .send({ message: 'Email is already used' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(
                    req.body.password,
                    salt,
                );
                const updateUser = await user.update({
                    username,
                    email,
                    password: hashedPassword,
                });
                const { password, ...info } = updateUser.dataValues;
                return reply.status(200).send(info);
            }
        } catch (error) {
            return reply.status(500).send(error);
        }
    },
    deleteUser: async (req, reply) => {
        const id = req.params.id;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return reply.status(404).send({ message: 'User not found' });
            }
            const rs = await User.destroy({ where: { id } });
            if (rs === 1) {
                return reply
                    .status(200)
                    .send({ message: 'Deleted user successfully' });
            } else {
                return reply
                    .status(400)
                    .send({ message: 'Deleted user failure' });
            }
        } catch (error) {
            return reply.status(500).send(error);
        }
    },
};
module.exports = userController;
