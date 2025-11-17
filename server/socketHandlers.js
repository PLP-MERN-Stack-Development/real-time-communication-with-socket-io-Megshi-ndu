// This module registers socket.io event handlers and holds in-memory stores for demo.
if (!user) return;
const list = messages[room] || [];
const m = list.find(x => x.id === messageId);
if (!m) return;
m.readBy = m.readBy || [];
if (!m.readBy.includes(user.username)) m.readBy.push(user.username);
io.to(room).emit('message:update', m);


socket.on('typing', ({ room, isTyping }) => {
const user = users[socket.id];
if (!user) return;
socket.to(room || 'global').emit('typing', { username: user.username, isTyping });
});


socket.on('join', ({ room }, cb) => {
const user = users[socket.id];
if (!user) return cb && cb({ ok: false, error: 'not authenticated' });
socket.leave(user.currentRoom);
socket.join(room);
user.currentRoom = room;
cb && cb({ ok: true, messages: (messages[room] || []).slice(-50) });
io.to(room).emit('room:join', { username: user.username, room });
});


socket.on('disconnect', () => {
const user = users[socket.id];
if (user) {
delete onlineUsers[user.username];
delete users[socket.id];
socket.broadcast.emit('user:offline', { username: user.username });
const leaveMsg = createMessage('system', null, `${user.username} left the chat`, 'global');
io.to('global').emit('message:new', leaveMsg);
}
});


// pagination endpoint via socket
socket.on('messages:older', ({ room, beforeId }, cb) => {
const list = messages[room] || [];
let idx = list.findIndex(m => m.id === beforeId);
if (idx === -1) idx = list.length;
const older = list.slice(Math.max(0, idx - 30), idx);
cb && cb({ ok: true, older });
});



function createMessage(from, to, text, room = 'global', type = 'text', file = null) {
return {
id: String(messageIdCounter++),
room,
from,
to,
text,
type,
file,
ts: Date.now(),
reactions: {},
readBy: []
};
}
