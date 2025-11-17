import { useState, useEffect } from "react";
import { socket } from "../socket";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";


export default function PrivateChat({ user, otherUser, setPrivateChatUser }) {
const [messages, setMessages] = useState([]);


useEffect(() => {
socket.emit("private:join", { user, otherUser });
socket.on("private:message", (msg) => setMessages((prev) => [...prev, msg]));


return () => socket.off("private:message");
}, []);


const sendMessage = (text) => {
socket.emit("private:send", { sender: user, receiver: otherUser, text });
};


return (
<div className="chat-container">
<button onClick={() => setPrivateChatUser(null)}>⬅ Back</button>
<h2>Chat with {otherUser}</h2>
<MessageList messages={messages} />
<MessageInput onSend={sendMessage} />
</div>
);
}