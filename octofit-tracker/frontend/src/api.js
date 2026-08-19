import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const codespaceApiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

// Vite proxies local development calls so the browser remains on the frontend origin.
export const apiBaseUrl = import.meta.env.DEV ? '/api' : codespaceApiBaseUrl

function recordsFrom(payload, collectionName) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.[collectionName])) return payload[collectionName]
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export function useApiCollection(resource, collectionName) {
  const [state, setState] = useState({ data: [], error: '', loading: true })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const response = await fetch(`${apiBaseUrl}/${resource}/`, { signal: controller.signal })
        if (!response.ok) throw new Error(`The API returned ${response.status}.`)
        const payload = await response.json()
        setState({ data: recordsFrom(payload, collectionName), error: '', loading: false })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setState({ data: [], error: error.message || 'Unable to load data.', loading: false })
        }
      }
    }

    load()
    return () => controller.abort()
  }, [collectionName, resource])

  return state
}