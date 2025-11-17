import { useState } from "react";


export default function MessageInput({ onSend }) {
const [text, setText] = useState("");


const submit = (e) => {
e.preventDefault();
if (!text.trim()) return;
onSend(text);
setText("");
};


return (
<form className="input-bar" onSubmit={submit}>
<input
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Type a message…"
/>
<button type="submit">Send</button>
</form>
);
}