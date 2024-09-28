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

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = ({ good, neutral, bad }) => {

  const total = good + neutral + bad
  const totalPoints = good * 1 + neutral * 0 + bad * -1;
  const average = total ? totalPoints / total : 0
  const positive = good ? good / total : 0

  if(total === 0){
    return (
      <p>No feedback given</p>
    )
  }else{
  return (
    <table>
      <StatisticLine text='Good' value={good} />
      <StatisticLine text='Neutral' value={neutral} />
      <StatisticLine text='Bad' value={bad} />
      <tr>
        <td>All:</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>Average:</td>
        <td>{average}</td>
      </tr>
      <tr>
        <td>Positive:</td>
        <td>{positive * 100} %</td>
      </tr>
    </table>
    )
  }
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

      <h2>Statistic</h2>
      
      <Statistic good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App
