import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const {text, value} = props
  const chkValue = (v) => {
    if(!v){
      return 0
    } else {
      return value
    }
  }
  return(
    <tr>
      <td>
        {text} {chkValue(value)}
      </td>
    </tr>
  )
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
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistics text="good" value={good}/>
          <Statistics text="neutral" value={neutral}/>
          <Statistics text="bad" value={bad}/>
          <Statistics text="all" value={good+neutral+bad}/>
          <Statistics text="average" value={(good-bad)/(good+neutral+bad)}/>
          <Statistics text="positive" value={(good/(good+neutral+bad))*100}/>
        </tbody>
      </table>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)