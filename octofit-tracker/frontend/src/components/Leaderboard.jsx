import { useApiCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Leaderboard() {
  const endpoint = import.meta.env.DEV
    ? '/api/leaderboard/'
    : import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
  const { data: entries, error, loading } = useApiCollection(endpoint, 'leaderboard')

  return (
    <section>
      <h1>Leaderboard</h1>
      <p className="page-intro">Current ranking based on completed activity points.</p>
      <ResourceState error={error} loading={loading}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Rank</th><th>Member</th><th className="text-end">Points</th></tr></thead>
            <tbody>{entries.map((entry) => <tr key={entry._id || entry.rank}><td><span className="rank">{entry.rank}</span></td><td className="fw-semibold">{entry.user?.name || entry.userName || 'Unassigned'}</td><td className="text-end fw-semibold">{entry.points}</td></tr>)}</tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}