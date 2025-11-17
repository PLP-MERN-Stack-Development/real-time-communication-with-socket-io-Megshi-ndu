import Message from '../models/Message.js';


export const getMessages = async (req, res) => {
const messages = await Message.find().sort({ createdAt: 1 });
res.json(messages);
};


export const getPrivateMessages = async (req, res) => {
const { user1, user2 } = req.params;
const messages = await Message.find({
$or: [
{ sender: user1, receiver: user2 },
{ sender: user2, receiver: user1 }
]
}).sort({ createdAt: 1 });


res.json(messages);
};