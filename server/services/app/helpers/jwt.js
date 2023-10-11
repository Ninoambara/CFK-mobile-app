const jwt = require("jsonwebtoken");
const KEY = 'inirahasia';

const createToken = (payload) => jwt.sign(payload, KEY);
const verifyToken = (token) => jwt.verify(token, KEY);

module.exports = { createToken, verifyToken };
