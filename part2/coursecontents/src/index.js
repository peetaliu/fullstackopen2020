import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}


const Content = (props) => {
    let partArr = props.parts;
    return (
        <div>
            {partArr.map(a => 
              <Part 
                key = {a.id}
                coName = {a.name}
                numEx = {a.exercises}
              />
              )}
        </div>
    )
}

const Total = (props) => {
  let exCount = props.parts.map(exArr => exArr.exercises)
  //console.log('exCount', exCount);
  const total = exCount.reduce((a, c) => a + c, 0)
    return (
        <div>
            <strong>Number of exercises {total}</strong>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>{props.coName} {props.numEx}</p> 
        </div>
    )
}

const Course = ({course}) => {
  let exCount = course.parts.map(x => x.exercises)
  //console.log('excount', exCount);
  return (
  <div>
    <Header title = {course.name}/>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts}/>
  </div>
)

  }
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
