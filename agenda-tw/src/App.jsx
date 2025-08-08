import { useState } from 'react'
import Hero from './components/Hero'
import Notify from './components/Notify'
import Top from './components/Top'
import Menu from './components/Menu'
import MegaMenu from './components/MegaMenu'
import Card from './components/Card'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Notify
        title="¡Atención!"
        message="Habrá una interrupción del servicio el sábado a las 11 PM."
        linkText="Ver detalles"
        linkUrl="https://tuservicio.com/interrupcion"
      />
      <Top />
      <MegaMenu />
      <Menu />
      <Hero />
      <Card />
    </>
  )
}

export default App
