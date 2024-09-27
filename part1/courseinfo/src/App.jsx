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
const App = () => {
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
      <Header course={course.name} />
      <Content name={course.parts[0].name} number={course.parts[0].exercises} />
      <Content name={course.parts[1].name} number={course.parts[1].exercises} />
      <Content name={course.parts[2].name} number={course.parts[2].exercises} />
      <Total parts1={course.parts[0].exercises} parts2={course.parts[1].exercises} parts3={course.parts[2].exercises} />
    </div>
  );
};

export default App;