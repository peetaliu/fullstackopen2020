import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

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

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [{
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
            <Header course={course}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
