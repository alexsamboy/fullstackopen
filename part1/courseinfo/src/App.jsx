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

const App = () => {
  const [ counter, setCounter ] = useState(0)

  /*setTimeout(
    () => setCounter(counter + 1),
    1000
  )*/

  //console.log('rendering...', counter)

  const handleClick = () => {
    console.log('Clickeado')
  }

  const setContador = () => setCounter(counter + 1)
  const setToZero = () => setCounter(0)

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
      
      <div>{ counter }</div>
      <button onClick={handleClick}>Plus</button>
      <button onClick={() => setCounter(counter + 1)}>Click me!</button>
      <button onClick={setContador}>+ Contador</button>
      <button onClick={setToZero}>zero</button>

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
};

export default App;