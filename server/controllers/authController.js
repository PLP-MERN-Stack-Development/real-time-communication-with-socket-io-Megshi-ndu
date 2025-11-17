import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
try {
const { username, password } = req.body;
const exists = await User.findOne({ username });


if (exists) return res.status(400).json({ message: 'User exists' });


const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ username, password: hashed });


res.json({ message: 'Registered', user });
} catch (err) {
res.status(500).json({ message: err.message });
}
};


export const login = async (req, res) => {
try {
const { username, password } = req.body;
const user = await User.findOne({ username });


if (!user) return res.status(404).json({ message: 'User not found' });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ message: 'Invalid password' });


const token = jwt.sign(
{ id: user._id, username: user.username },
process.env.JWT_SECRET,
{ expiresIn: process.env.JWT_EXPIRES_IN }
);


res.json({ token, user });
} catch (err) {
res.status(500).json({ message: err.message });
}
};