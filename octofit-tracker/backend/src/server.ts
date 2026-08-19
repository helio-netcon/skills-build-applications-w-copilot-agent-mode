import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import './config/database.js';
import { Activity } from './models/Activity.js';
import { LeaderboardEntry } from './models/LeaderboardEntry.js';
import { Team } from './models/Team.js';
import { User } from './models/User.js';
import { Workout } from './models/Workout.js';

const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  codespaceName ? `https://${codespaceName}-5173.app.github.dev` : undefined,
].filter((origin): origin is string => Boolean(origin));

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin is not allowed by CORS.'));
  },
}));
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users/', async (_request, response) => {
  response.json({ users: await User.find().sort({ name: 1 }).lean() });
});

app.get('/api/teams/', async (_request, response) => {
  response.json({ teams: await Team.find().populate('members', 'name email').lean() });
});

app.get('/api/activities/', async (_request, response) => {
  response.json({ activities: await Activity.find().populate('user', 'name').sort({ completedAt: -1 }).lean() });
});

app.get('/api/leaderboard/', async (_request, response) => {
  response.json({ leaderboard: await LeaderboardEntry.find().populate('user', 'name').sort({ rank: 1 }).lean() });
});

app.get('/api/workouts/', async (_request, response) => {
  response.json({ workouts: await Workout.find().sort({ title: 1 }).lean() });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});