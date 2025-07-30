import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: String,
  company: String,
  role: String,
  package: Number,
  type: { type: String, enum: ['internship', 'placement'] },
  department: String,
  cgpa: Number,
  cgpaMatters: Boolean,
  rounds: Number,
  questions: [String],
  questionTags: [String],
  preparationDuration: String,
  resources: [String],
  timeline: String,
  difficultyRating: Number,
  wouldRecommend: Boolean,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Experience', experienceSchema);
