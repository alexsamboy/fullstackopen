import { useState } from 'react'
import reactLogo from './assets/react.svg'
import pucmmLogo from './assets/pucmm-logo.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='container'>
      <div className='row'>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={pucmmLogo} className="logo w-25" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Bootstrap5</h1>
      <div className="card bg-info bg-gradient text-white">
        <button className="btn btn-warning" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </div>
  )
}

export default App
