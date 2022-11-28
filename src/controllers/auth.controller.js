const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../helpers/generateToken');
class authController {
    static async register(req, reply) {
        const { username, email } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if (user)
                return reply
                    .status(400)
                    .send({ message: 'Email already in used' });
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            const { password, ...info } = savedUser.dataValues;
            return reply.status(201).send(info);
        } catch (error) {
            return reply.status(500).send(error);
        }
    }
    static async login(req, reply) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ where: { email: email } });
            if (!user) {
                return reply
                    .status(404)
                    .send({ message: 'Email is not registered' });
            }
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (!isValidPassword) {
                return reply.status(400).send({ message: 'Invalid password' });
            }
            const { password, ...info } = user.dataValues;
            const accessToken = generateAccessToken(info);
            return reply.status(200).send({ ...info, accessToken });
        } catch (error) {
            return reply.status(500).send(error);
        }
    }
}

module.exports = authController;
