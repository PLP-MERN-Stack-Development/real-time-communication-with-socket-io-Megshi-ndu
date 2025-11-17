import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({
sender: { type: String, required: true },
receiver: { type: String, default: null },
content: { type: String, required: true },
roomId: { type: String, default: 'global' },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Message', MessageSchema);