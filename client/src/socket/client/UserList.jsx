export default function UserList({ users, onPrivateChat }) {
return (
<aside className="user-list">
<h3>Online Users</h3>
{users.map((u) => (
<div key={u} onClick={() => onPrivateChat(u)} className="user-item">
{u}
</div>
))}
</aside>
);
}