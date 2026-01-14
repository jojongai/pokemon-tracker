import React, { useEffect, useState } from 'react'

export default function App() {
  const [msg, setMsg] = useState('loading...')

  useEffect(() => {
    const url = import.meta.env.VITE_BACKEND_URL || '/api/hello'
    fetch(url)
      .then((r) => r.json())
      .then((d) => setMsg(d.message))
      .catch(() => setMsg('error'))
  }, [])

  return (
    <div className="app">
      <h1>Frontend</h1>
      <p>{msg}</p>
    </div>
  )
}
