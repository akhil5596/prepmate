import mongoose from 'mongoose';

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  tags: [String],
  testCases: [{
    input: String,
    output: String,
    isHidden: { type: Boolean, default: false },
  }],
  starterCode: {
    javascript: { type: String, default: '' },
    python: { type: String, default: '' },
    java: { type: String, default: '' },
    cpp: { type: String, default: '' },
  },
  solutions: [{
    language: String,
    code: String,
    explanation: String,
  }],
  stats: {
    submissions: { type: Number, default: 0 },
    accepted: { type: Number, default: 0 },
  },
}, { timestamps: true });

export default mongoose.model('Problem', problemSchema);
