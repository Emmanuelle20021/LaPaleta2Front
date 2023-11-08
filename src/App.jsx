import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount(count + 1)
  }

  return (
    <>
      <main>
        <h1>La Paleta</h1>
        <p>{count}</p>
        <button onClick={add}>Suma en 1</button>
      </main>
    </>
  )
}

export default App
