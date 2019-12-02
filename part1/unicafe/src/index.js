import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const {title, g, n, b} = props
  if(!g && !n && !b){
    return(
      <div>
        <h1>{title}</h1>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
    <div>
      <h1>{title}</h1>
      <p>good {g}</p>
      <p>neutral {n}</p>
      <p>bad {b}</p>
      <p>all {g + n + b} </p>
      <p>avg {(g-b)/(g+n+b)}</p>
      <p>positive {(g/(g+n+b))*100}</p>
    </div>
    )
  }
}
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good + 1)} text="good" />
      <Button handleClick={()=> setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={()=> setBad(bad + 1)} text="bad" />

      <Statistics title="Statistics" g={good} n={neutral} b={bad}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)