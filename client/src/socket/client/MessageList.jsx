import { motion } from "framer-motion";


export default function MessageList({ messages }) {
return (
<div className="message-list">
{messages.map((m, i) => (
<motion.div
key={i}
className="message"
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
>
<strong>{m.sender}: </strong> {m.text}
</motion.div>
))}
</div>
);
}