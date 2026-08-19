import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [['users', 'Users'], ['teams', 'Teams'], ['activities', 'Activities'], ['leaderboard', 'Leaderboard'], ['workouts', 'Workouts']]

function App() {
  return (
    <div className="app-shell">
      <header className="app-header"><div className="container-xl d-flex align-items-center justify-content-between gap-3"><div className="brand"><img src="/octofitapp-small.png" alt="OctoFit" /><span>OctoFit Tracker</span></div><span className="status-indicator">Live data</span></div></header>
      <nav className="app-nav" aria-label="Primary navigation"><div className="container-xl nav-scroller">{navigation.map(([path, label]) => <NavLink key={path} to={`/${path}`} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{label}</NavLink>)}</div></nav>
      <main className="container-xl py-4 py-md-5"><Routes><Route path="/users" element={<Users />} /><Route path="/teams" element={<Teams />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/workouts" element={<Workouts />} /><Route path="*" element={<Navigate to="/activities" replace />} /></Routes></main>
    </div>
  )
}

export default App
