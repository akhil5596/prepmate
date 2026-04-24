import { Router } from 'express';
import { Room } from '../models/Room.js';
import { auth } from '../middleware/auth.js';
import crypto from 'crypto';

const router = Router();

// Create room
router.post('/', auth, async (req, res) => {
  try {
    const roomId = crypto.randomBytes(4).toString('hex');
    const room = await Room.create({
      roomId,
      host: req.user.id,
      participants: [req.user.id],
      type: req.body.type || 'coding',
      language: req.body.language || 'javascript',
    });
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get room
router.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId }).populate('participants', 'username avatar');
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List active rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find({ isActive: true })
      .populate('host', 'username')
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
