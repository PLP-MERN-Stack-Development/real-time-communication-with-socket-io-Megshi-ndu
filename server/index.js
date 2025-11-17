const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const auth = require('./auth');
const socketHandlers = require('./socketHandlers');
const multer = require('multer');
const path = require('path');


const upload = multer({ dest: path.join(__dirname, 'uploads/') });


const app = express();
app.use(cors());
app.use(express.json());


// Simple auth endpoint: returns a JWT for a username
app.post('/api/login', (req, res) => {
const { username } = req.body;
if (!username || username.trim().length < 1) return res.status(400).json({ error: 'username required' });
const token = auth.sign({ username });
return res.json({ token, username });
});


// simple file upload endpoint (optional) - returns a URL path (server serves uploads)
app.post('/api/upload', upload.single('file'), (req, res) => {
if (!req.file) return res.status(400).json({ error: 'no file' });
const url = `/uploads/${req.file.filename}`;
return res.json({ url });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const server = http.createServer(app);


const io = new Server(server, {
cors: {
origin: '*',
methods: ['GET', 'POST']
},
pingTimeout: 60000
});


// Attach socket handlers and pass auth helper
socketHandlers(io);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));