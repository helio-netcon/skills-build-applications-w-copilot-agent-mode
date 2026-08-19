export default function ResourceState({ children, error, loading }) {
  if (loading) return <p className="text-secondary">Loading data...</p>
  if (error) return <div className="alert alert-danger mb-0">{error}</div>
  return children
}