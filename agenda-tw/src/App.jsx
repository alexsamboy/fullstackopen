import { useState } from 'react'
import Hero from './components/Hero'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>Probando</h1>
        <Hero />
      </div>
    </>
  )
}

export default App
