import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part coName="Fundamentals of React" numEx="10"/>
            <Part coName="Using props to pass data" numEx="7"/>  
            <Part coName="State of a component" numEx="14"/>  
        </div>
    )
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.exCount}</p>
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

const App = () => {
    const course = 'Half Stack application development'
    //const part1 = 'Fundamentals of React'
    const exercises1 = 10
    //const part2 = 'Using props to pass data'
    const exercises2 = 7
    //const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content />
            <Total exCount={exercises1 + exercises2 + exercises3}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
