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

const Feedback = ({ text, value }) => {
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Total = ({ good, neutral, bad }) => {
  return (
    <p>
      Total: {good + neutral + bad}
    </p>
    )
}

const Statistic = ({ text, value }) => {
  return (
    <p>
      {text}: {value}
    </p>
  )
}

const App = () => {
  const appName = 'Give Feedback'

  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const totalPoints = good * 1 + neutral * 0 + bad * -1;

  return (
    <div>
      <Header name = {appName} />
      <Button onClick={() => setGood(good + 1)} text='Good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='Neutral' />
      <Button onClick={() => setBad(bad + 1)} text='Bad' />
      <h2>Stats</h2>
      <Feedback text='Good' value={good} />
      <Feedback text='Neutral' value={neutral} />
      <Feedback text='Bad' value={bad} />
      <Total good={good} neutral={neutral} bad={bad} />
      <Statistic text='Average' value={total ? totalPoints / total : 0} />
      <Statistic text='Positive' value={good ? good / total : 0} />
    </div>
  )
}

export default App
