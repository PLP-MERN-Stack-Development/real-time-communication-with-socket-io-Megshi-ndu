import { useEffect, useState } from "react";
import { socket } from "../socket";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import UserList from "../components/UserList";


export default function ChatRoom({ user, setPrivateChatUser }) {
const [messages, setMessages] = useState([]);
const [onlineUsers, setOnlineUsers] = useState([]);


useEffect(() => {
socket.connect();
socket.emit("user:join", user);


socket.on("message:new", (msg) => setMessages((prev) => [...prev, msg]));


socket.on("users:update", (users) => setOnlineUsers(users));


return () => socket.disconnect();
}, []);


const sendMessage = (text) => socket.emit("message:send", { sender: user, text });


return (
<div className="chat-container">
<UserList users={onlineUsers} onPrivateChat={setPrivateChatUser} />
<div className="chat-box">
<MessageList messages={messages} />
<MessageInput onSend={sendMessage} />
</div>
</div>
);
}