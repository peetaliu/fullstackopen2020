import React from 'react'

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
  const coursesArr = () => courses.map(cArr => 
    <div key={cArr.id}>
      <Header title={cArr.name}/>
      <Content parts={cArr.parts}/>
      <Total parts={cArr.parts}/>
    </div>
  )
  return (
  <div>
    {coursesArr()}
  </div>
  )
}

export default Course