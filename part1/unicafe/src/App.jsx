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

const Statistic = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const totalPoints = good * 1 + neutral * 0 + bad * -1;
  const average = total ? totalPoints / total : 0
  const positive = good ? good / total : 0
  return (
    <p>
      Total: {total}<br />
      Average: {average}<br />
      Positive: {positive}
    </p>
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
      
      <Feedback text='Good' value={good} />
      <Feedback text='Neutral' value={neutral} />
      <Feedback text='Bad' value={bad} />
      <Statistic good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
