import express from 'express';
import { protect } from '../middleware/auth.js';
import { getMessages, getPrivateMessages } from '../controllers/chatController.js';


const router = express.Router();


router.get('/messages', protect, getMessages);
router.get('/private/:user1/:user2', protect, getPrivateMessages);


export default router;