import mongoose from 'mongoose';


const ChatRoomSchema = new mongoose.Schema({
name: { type: String, required: true },
members: [String]
});


export default mongoose.model('ChatRoom', ChatRoomSchema);