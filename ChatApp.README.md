# Real-Time Chat Application (MERN + WebSockets + File Uploads)

A modern real-time chat application built using **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Socket.IO**, featuring:

✅ Real-time messaging (global rooms + private chats)
✅ Image/File uploads (local or Cloudinary)
✅ Online user tracking + Admin monitoring panel
✅ MongoDB-backed message store with schemas & migrations
✅ Full security middleware (Helmet, CORS, Rate Limiting)
✅ Responsive UI + Framer Motion animations

---

## 🚀 Project Structure

```
├─ index.html
├─ vite.config.js
├─ README.md
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ api.js
│  ├─ socket.js
│  ├─ index.css
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  ├─ ChatRoom.jsx
│  │  └─ PrivateChat.jsx
│  └─ components/
│     ├─ MessageList.jsx
│     ├─ MessageInput.jsx
│     └─ UserList.jsx
└─ server/
   ├─ server.js
   ├─ config/
   │  └─ db.js
   ├─ controllers/
   ├─ middleware/
   ├─ models/
   ├─ routes/
   └─ uploads/
```

---

## 🛠 Tech Stack

### **Frontend**

* React + Vite
* Framer Motion
* CSS3 (fully responsive)
* Axios
* Socket.IO Client

### **Backend**

* Node.js + Express
* MongoDB + Mongoose
* Cloudinary (optional file storage)
* Socket.IO server

### **Security**

* Helmet
* Rate Limiter
* CORS properly configured for dev

---

## 📦 Installation

### 1️⃣ Clone the repository

```
git clone <repo-url>
cd project
```

### 2️⃣ Install dependencies

#### Frontend

```
cd client
npm install
```

#### Backend

```
cd server
npm install
```

---

## 🔐 Environment Variables

### **Frontend (`/client/.env`)**

```
VITE_API_URL=http://localhost:4001
VITE_SOCKET_URL=http://localhost:4001
```

### **Backend (`/server/.env`)**

```
PORT=4001
MONGO_URI=mongodb://127.0.0.1:27017/chatapp
JWT_SECRET=your_generated_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
CLIENT_ORIGIN=http://localhost:5153
```

---

## ▶️ Running the Project

### Start backend

```
cd server
npm run dev
```

### Start frontend

```
cd client
npm run dev
```

🚀 App runs at: [http://localhost:5153](http://localhost:5153)
🖥 Backend runs at: [http://localhost:4001](http://localhost:4001)

---

## 📡 WebSockets (Socket.IO)

Features:

* User login + online tracking
* Public room chat
* Private chat via direct socket namespace
* Typing indicators (optional)

---

## 📁 File/Image Uploads

Supports:

* Local uploads (`/server/uploads`)
* Cloudinary uploads if enabled

Endpoints:

```
POST /api/upload
```

Returns:

```
{
  filename,
  url
}
```

---

## 🧩 Admin Monitoring Panel

Accessible only with admin token.

Displays:

* Live online users
* Active rooms
* Recent messages
* System stats

---

## 🔧 Migrations

If message schema updates:

```
node scripts/migrateMessages.js
```

Ensures backward compatibility.

---

## 🎨 Frontend UI Features

* Responsive layout for mobile/desktop
* Smooth animations (Framer Motion)
* Animated message bubbles
* Typing indicators
* Dark-mode ready (optional)

---

## ❗ Troubleshooting

### **CORS errors?**

Ensure backend `.env` contains:

```
CLIENT_ORIGIN=http://localhost:5153
```

And server has:

```js
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));
```

### **Socket.IO not connecting?**

Check:

```js
io.origin(process.env.CLIENT_ORIGIN)
```

### **MongoDB connection refused?**

Make sure MongoDB is running:

```
mongod
```

---

## 🤝 Contributing

Pull requests welcome!

---

## 📄 License

MIT License
