import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['student', 'interviewer', 'admin'], default: 'student' },
  githubId: { type: String, sparse: true },
  avatar: { type: String, default: '' },
  skills: [String],
  stats: {
    problemsSolved: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    rating: { type: Number, default: 1200 },
    rank: { type: Number, default: 0 },
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
