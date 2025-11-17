export async function login(username) {
const res = await fetch((import.meta.env.VITE_SERVER_URL || 'http://localhost:4000') + '/api/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ username })
});
return res.json();
}


export async function uploadFile(file) {
const fd = new FormData();
fd.append('file', file);
const res = await fetch((import.meta.env.VITE_SERVER_URL || 'http://localhost:4000') + '/api/upload', { method: 'POST', body: fd });
return res.json();
}