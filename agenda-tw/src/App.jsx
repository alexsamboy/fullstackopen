import { useState } from 'react'
import Hero from './components/Hero'
import Notify from './components/Notify'
import Top from './components/Top'
import Menu from './components/Menu'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Notify />
      <Top />
      <Menu />
      <Hero />

    </>
  )
}

export default App
