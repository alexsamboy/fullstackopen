import { useState } from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};
const Part = (props) => {
  return (
    <>
      <p>{props.name}</p>
      <p>{props.number}</p>
    </>
  );
};
const Content = (props) => {
  return (
    <div>
      <Part name={props.name} number={props.number} />
    </div>
  );
};
const Total = (props) => {
  return <p>Number of exercises {props.parts1 + props.parts2 + props.parts3}</p>;
};

const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age
    
  return(
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const Display = ({ counter }) => <div>{ counter }</div>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

/*const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  const name = 'Peter'
  const age = 10
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>

      <Display counter = { counter } />
      <Button onClick = {increaseByOne} text='plus' />
      <Button onClick = {decreaseByOne} text='minus' />
      <Button onClick = {setToZero} text='Zero' />

      <h1>Greetings</h1>
      <Hello name = 'Manuel' age = {42} />
      <Hello name={name} age={age} />


      <Header course={course.name} />
      <Content name={course.parts[0].name} number={course.parts[0].exercises} />
      <Content name={course.parts[1].name} number={course.parts[1].exercises} />
      <Content name={course.parts[2].name} number={course.parts[2].exercises} />
      <Total parts1={course.parts[0].exercises} parts2={course.parts[1].exercises} parts3={course.parts[2].exercises} />
    </div>
  );
};*/

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)

    setTotal(left + right)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>

      <History allClicks={allClicks} />
    </div>
  )
}

export default App;