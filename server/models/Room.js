import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  type: { type: String, enum: ['coding', 'interview'], default: 'coding' },
  code: { type: String, default: '' },
  language: { type: String, default: 'javascript' },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  room: { type: String, required: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  username: String,
  message: { type: String, required: true },
}, { timestamps: true });

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  code: { type: String, required: true },
  language: String,
  status: { type: String, enum: ['accepted', 'wrong_answer', 'runtime_error', 'time_limit'], default: 'wrong_answer' },
  runtime: Number,
  memory: Number,
}, { timestamps: true });

export const Room = mongoose.model('Room', roomSchema);
export const Message = mongoose.model('Message', messageSchema);
export const Submission = mongoose.model('Submission', submissionSchema);
