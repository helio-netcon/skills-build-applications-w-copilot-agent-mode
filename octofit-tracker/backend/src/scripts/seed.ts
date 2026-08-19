import mongoose from 'mongoose';
import { Activity } from '../models/Activity.js';
import { LeaderboardEntry } from '../models/LeaderboardEntry.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [alex, beatriz, carlos] = await User.create([
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', goal: 'Run a 10K' },
      { name: 'Beatriz Lima', email: 'beatriz.lima@example.com', goal: 'Build strength' },
      { name: 'Carlos Souza', email: 'carlos.souza@example.com', goal: 'Improve mobility' },
    ]);

    await Team.create({
      name: 'Morning Movers',
      description: 'A team that starts the day with focused movement.',
      members: [alex._id, beatriz._id, carlos._id],
    });

    await Activity.create([
      {
        user: alex._id,
        type: 'Morning run',
        durationMinutes: 42,
        caloriesBurned: 460,
        completedAt: new Date('2026-08-18T06:30:00Z'),
      },
      {
        user: beatriz._id,
        type: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 390,
        completedAt: new Date('2026-08-18T18:15:00Z'),
      },
      {
        user: carlos._id,
        type: 'Yoga flow',
        durationMinutes: 35,
        caloriesBurned: 180,
        completedAt: new Date('2026-08-19T07:00:00Z'),
      },
    ]);

    await LeaderboardEntry.create([
      { user: alex._id, points: 1280, rank: 1 },
      { user: beatriz._id, points: 1140, rank: 2 },
      { user: carlos._id, points: 980, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Full-Body Foundation',
        category: 'Strength',
        durationMinutes: 30,
        difficulty: 'Beginner',
        instructions: ['Warm up for five minutes.', 'Complete three full-body rounds.', 'Cool down and stretch.'],
      },
      {
        title: 'Interval Run Builder',
        category: 'Cardio',
        durationMinutes: 40,
        difficulty: 'Intermediate',
        instructions: ['Jog for ten minutes.', 'Run six two-minute intervals.', 'Walk for five minutes.'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
