import { useApiCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Activities() {
  const { data: activities, error, loading } = useApiCollection('/api/activities/', 'activities')

  return (
    <section>
      <h1>Activities</h1>
      <p className="page-intro">Latest training completed by the team.</p>
      <ResourceState error={error} loading={loading}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Activity</th><th>Member</th><th>Duration</th><th>Calories</th><th>Completed</th></tr></thead>
            <tbody>{activities.map((activity) => <tr key={activity._id}><td className="fw-semibold">{activity.type}</td><td>{activity.user?.name || activity.userName || 'Unassigned'}</td><td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned}</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}