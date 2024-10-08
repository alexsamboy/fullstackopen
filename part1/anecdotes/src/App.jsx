import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const MostVotes = ({votes, anecdotes}) => {
  const maxVotes = votes.indexOf(Math.max(...votes))
  return(
    <p>{anecdotes[maxVotes]} Has {votes[maxVotes]} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(0)

  const randomNumber = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    //console.log(number)
    setSelected(number)
  }

  const onVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
    //console.log(copyVotes)
  }

  return (
    <div>
      {anecdotes[selected]}<br />
      <p>Has {votes[selected]} votes.</p>
      <Button onClick={onVote} text='Vote' />
      <Button onClick={randomNumber} text='Next anecdote' />
      <MostVotes votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

export default App
