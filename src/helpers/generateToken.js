const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// console.log(process.env.ACCESS_TOKEN_SECRET);
const generateAccessToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '3h',
    });
};

module.exports = { generateAccessToken };
