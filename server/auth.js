const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';


exports.sign = (payload) => jwt.sign(payload, SECRET, { expiresIn: '7d' });
exports.verify = (token) => jwt.verify(token, SECRET);