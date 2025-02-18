import { useState } from 'react'
import reactLogo from './assets/react.svg'
import pucmmLogo from './assets/pucmm-logo.svg'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
    </>
  )
}

export default App
