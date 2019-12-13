import React from 'react'
import ReactDOM from 'react-dom'
// eslint-disable-next-line
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

const Course = ({courses}) => {
  return (
  <div>
    {courses.map(cArr => ([<Header title={cArr.name} key={cArr.id}/>, <Content parts={cArr.parts} key={cArr.parts.id}/>, <Total parts={cArr.parts} key={cArr.parts.id}/>]))}
  </div>
)

  }
const App = () => {
  // const course = {
  //   name: 'Half Stack application development',
  //   parts: [
  //     {
  //       name: 'Fundamentals of React',
  //       exercises: 10,
  //       id: 1
  //     },
  //     {
  //       name: 'Using props to pass data',
  //       exercises: 7,
  //       id: 2
  //     },
  //     {
  //       name: 'State of a component',
  //       exercises: 14,
  //       id: 3
  //     },
  //     {
  //       name: 'Redux',
  //       exercises: 11,
  //       id: 4
  //     }
  //   ]
  // }
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
