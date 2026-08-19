import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: { type: String, required: true },
    instructions: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Workout = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);