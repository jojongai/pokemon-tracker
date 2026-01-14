import React, { useEffect, useState } from 'react'

export default function App() {
  const [msg, setMsg] = useState('loading...')
  const [data, setData] = useState(null)

  useEffect(() => {
    const BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080'

    fetch(`${BASE}/api/hello`)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch((err) => {
        console.error('Error fetching /api/hello', err)
        setMsg('error')
      })

    // fetch test data
    fetch(`${BASE}/api/data`)
      .then((r) => {
        if (!r.ok) throw new Error(`network ${r.status}`)
        return r.json()
      })
      .then((json) => setData(json))
      .catch((e) => {
        console.error('Error fetching /api/data', e)
        setData({ error: 'failed to load data' })
      })
  }, [])

  return (
    <div className="app">
      <h1>Frontend</h1>
      <p>{msg}</p>

      <section style={{ marginTop: 20 }}>
        <h2>Test Data from Backend</h2>
        {data ? (
          data.error ? (
            <div style={{ color: 'red' }}>{data.error}</div>
          ) : (
            <div>
              <p><strong>{data.title}</strong></p>
              <p>{data.description}</p>
              <ul>
                {Array.isArray(data.items) && data.items.map(item => (
                  <li key={item.id}>{item.id} — {item.name}</li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <div>Loading data...</div>
        )}
      </section>
    </div>
  )
}
