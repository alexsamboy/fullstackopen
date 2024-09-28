import { useState } from 'react'

const Header = (props) => {
  return (
    <header>
      <h1>{props.name}</h1>
    </header>
  )
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const App = () => {
  const appName = 'Give Feedback'

  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header name = {appName} />
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <h2>Stats</h2>
      <Statistic text='Good' value={good} />
      <Statistic text='Neutral' value={neutral} />
      <Statistic text='Bad' value={bad} />
    </div>
  )
}

export default App
