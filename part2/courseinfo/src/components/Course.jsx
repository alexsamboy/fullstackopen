const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
};
const Header = (props) => {
    return (
        <>
            <h1>{props.course.name}</h1>
        </>
    );
};
const Part = (props) => {
    return (
        <>
            <p>{props.name} {props.number}</p>
        </>
    );
};
const Content = (props) => {
    return (
        <div>
        {props.parts.map(parts=>
            <Part key={parts.id} name={parts.name} number={parts.exercises} />)}
        </div>
    );
};

const Total = (props) => {
    const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><strong>Total of {totalExercises} exercises</strong></p>
  };

export default Course