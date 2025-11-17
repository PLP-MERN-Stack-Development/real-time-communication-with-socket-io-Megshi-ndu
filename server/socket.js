import { Server } from 'socket.io';
import Message from './models/Message.js';
import User from './models/User.js';


let onlineUsers = {};


export const initSocketServer = (server) => {
const io = new Server(server, {
cors: { origin: process.env.CLIENT_URL }
});


io.on('connection', (socket) => {
console.log('User connected:', socket.id);


socket.on('registerUser', async (userId) => {
onlineUsers[userId] = socket.id;
io.emit('onlineUsers', Object.keys(onlineUsers));
});


socket.on('sendMessage', async (data) => {
const newMessage = await Message.create(data);
io.emit('newMessage', newMessage);
});


socket.on('privateMessage', (data) => {
const receiverSocket = onlineUsers[data.receiverId];
if (receiverSocket) io.to(receiverSocket).emit('privateMessage', data);
});


socket.on('typing', (roomId) => {
socket.to(roomId).emit('typing');
});


socket.on('disconnect', () => {
Object.keys(onlineUsers).forEach((userId) => {
if (onlineUsers[userId] === socket.id) delete onlineUsers[userId];
});
io.emit('onlineUsers', Object.keys(onlineUsers));
});
});
};