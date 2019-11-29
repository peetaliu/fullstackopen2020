import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  function calculateAvg(pos, neu, neg){
    let avg = (pos-neg)/(pos+neu+neg)

    return avg
  }

  function getPosPer(g, n, b){
    return (g/(g+n+b))*100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=> setGood(good + 1)} text="good" />
      <Button handleClick={()=> setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={()=> setBad(bad + 1)} text="bad" />

      <h1>statistics</h1>

      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p> 
      <p>all {good + neutral + bad}</p>
      <p>average {calculateAvg(good, neutral, bad)}</p>
      <p>positive {getPosPer(good, neutral, bad)} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)