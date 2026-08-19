import { useApiCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Workouts() {
  const endpoint = import.meta.env.DEV
    ? '/api/workouts/'
    : import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
  const { data: workouts, error, loading } = useApiCollection(endpoint, 'workouts')

  return (
    <section>
      <h1>Workouts</h1>
      <p className="page-intro">Ready-to-follow sessions for the next training block.</p>
      <ResourceState error={error} loading={loading}>
        <div className="row g-3">
          {workouts.map((workout) => <div className="col-md-6" key={workout._id || workout.title}><article className="workout-card"><div className="d-flex justify-content-between align-items-start gap-3"><div><p className="eyebrow">{workout.category}</p><h2>{workout.title}</h2></div><span className="duration">{workout.durationMinutes} min</span></div><p className="difficulty">{workout.difficulty}</p><ol>{(workout.instructions || []).map((instruction) => <li key={instruction}>{instruction}</li>)}</ol></article></div>)}
        </div>
      </ResourceState>
    </section>
  )
}