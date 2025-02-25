import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Counter App</h1>
        <h2>{count}</h2>

        <button onClick={() => setCount(count + 1)}>Increment</button>

        <button onClick={() => setCount(count > 0 ? count - 1 : 0)}>Decrement</button>

        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </>
  )
}

export default App
