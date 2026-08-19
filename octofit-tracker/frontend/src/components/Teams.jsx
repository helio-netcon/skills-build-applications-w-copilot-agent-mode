import { useApiCollection } from '../api.js'
import ResourceState from './ResourceState.jsx'

export default function Teams() {
  const { data: teams, error, loading } = useApiCollection('teams', 'teams')

  return (
    <section>
      <h1>Teams</h1>
      <p className="page-intro">Groups building consistency together.</p>
      <ResourceState error={error} loading={loading}>
        <div className="row g-3">
          {teams.map((team) => <div className="col-md-6" key={team._id || team.name}><article className="team-card"><h2>{team.name}</h2><p>{team.description}</p><div className="member-list">{(team.members || []).map((member) => <span key={member._id || member.email} className="member-chip">{member.name || member}</span>)}</div></article></div>)}
        </div>
      </ResourceState>
    </section>
  )
}