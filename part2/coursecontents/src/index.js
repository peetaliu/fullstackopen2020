import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
}

// eslint-disable-next-line
const Content = (props) => {
    let partArr = props.parts;

    return (
        <div>
            <Part coName={partArr[0].name} numEx={partArr[0].exercises}/>
            <Part coName={partArr[1].name} numEx={partArr[1].exercises}/>  
            <Part coName={partArr[2].name} numEx={partArr[2].exercises}/>  
        </div>
    )
}
// eslint-disable-next-line
const Total = (props) => {
    let ex = props.parts
    const sum = (p1, p2, p3) => {
        return p1 + p2 + p3
    }
    let totalCount = sum(ex[0].exercises, ex[1].exercises, ex[2].exercises);
    return (
        <div>
            <p>Number of exercises {totalCount}</p>
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
  
  // const courseNames = () => {
  //   course.parts.map(a => <Part coName = {a.name}/>)
  // }
  return (
  <div>
    <Header title = {course.name}/>
    {course.parts.map(a => <Part coName = {a.name}/>)}
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
