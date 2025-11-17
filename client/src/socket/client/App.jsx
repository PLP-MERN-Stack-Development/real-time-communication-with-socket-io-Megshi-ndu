import { useState } from "react";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import PrivateChat from "./pages/PrivateChat";


export default function App() {
const [user, setUser] = useState(null);
const [privateChatUser, setPrivateChatUser] = useState(null);


if (!user) return <Login setUser={setUser} />;
if (privateChatUser)
return <PrivateChat user={user} otherUser={privateChatUser} setPrivateChatUser={setPrivateChatUser} />;


return <ChatRoom user={user} setPrivateChatUser={setPrivateChatUser} />;
}