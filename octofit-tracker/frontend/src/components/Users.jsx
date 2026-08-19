import { useApiCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Users() {
  const { data: users, error, loading } = useApiCollection('users', 'users')

  return (
    <section>
      <h1>Users</h1>
      <p className="page-intro">Member profiles and current fitness goals.</p>
      <ResourceState error={error} loading={loading}>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead><tr><th>Member</th><th>Email</th><th>Goal</th></tr></thead>
            <tbody>{users.map((user) => <tr key={user._id || user.email}><td className="fw-semibold">{user.name}</td><td>{user.email}</td><td>{user.goal}</td></tr>)}</tbody>
          </table>
        </div>
      </ResourceState>
    </section>
  )
}