import { useState } from "react";


export default function Login({ setUser }) {
const [username, setUsername] = useState("");


const handleLogin = (e) => {
e.preventDefault();
if (username.trim()) setUser(username);
};


return (
<div className="center-container">
<form className="login-form" onSubmit={handleLogin}>
<h2>Welcome</h2>
<input
placeholder="Enter username"
value={username}
onChange={(e) => setUsername(e.target.value)}
/>
<button type="submit">Join Chat</button>
</form>
</div>
);
}