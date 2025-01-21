import Course from './components/Course'



const App = (props) => {

  const {course} = props;
  

  return (
      course.map(course =>
      <Course key={course.id} course={course} />
      )
  )
}

export default App