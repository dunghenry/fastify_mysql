const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req, reply, done) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        if (!accessToken) {
            return reply.status(404).send({ message: 'Token not found!' });
        } else {
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (error, user) => {
                    if (error?.name === 'TokenExpiredError') {
                        return reply
                            .status(403)
                            .send({ message: 'Token is expired!' });
                    } else if (error) {
                        return reply
                            .status(403)
                            .send({ message: 'Token is not valid!' });
                    }
                    req.user = user;
                    done();
                },
            );
        }
    } else {
        return reply.status(401).send({ message: "You're not authenticated" });
    }
};

const verifyTokenAndUserAuthorization = (req, reply, done) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        if (!accessToken) {
            return reply.status(404).send({ message: 'Token not found!' });
        } else {
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (error, user) => {
                    if (error?.name === 'TokenExpiredError') {
                        return reply
                            .status(403)
                            .send({ message: 'Token is expired!' });
                    } else if (error) {
                        return reply
                            .status(403)
                            .send({ message: 'Token is not valid!' });
                    }
                    if (user.userId === +req.params.id) {
                        done();
                    } else {
                        return reply
                            .status(401)
                            .send({ message: "You're not authenticated" });
                    }
                },
            );
        }
    } else {
        return reply.status(401).send({ message: "You're not authenticated" });
    }
};
module.exports = { verifyToken, verifyTokenAndUserAuthorization };
