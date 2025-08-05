import { useState } from 'react'
import Hero from './components/Hero'
import Notify from './components/Notify'
import Top from './components/Top'
import Menu from './components/Menu'
import MegaMenu from './components/MegaMenu'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Notify />
      <Top />
      <MegaMenu />
      <Menu />
      <Hero />

    </>
  )
}

export default App
