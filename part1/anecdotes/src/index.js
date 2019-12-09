import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const DisplayAnecdotes = (props) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.text}</p>
    <p>has {props.votes} votes</p>
  </div>
)

const App = (props) => {
  let anec = props.anecdotes;
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anec.length).fill(0))

  const getRandom = (currVal) => {
    let num = Math.floor(Math.random() * anec.length)
    while(num === currVal){
      num = Math.floor(Math.random() * anec.length)
    }
    return num
  }

  const addVote = (vote) => {
    let copy = [...votes]
    copy[vote] += 1
    return copy
  }

  const getMax = () => votes.indexOf(Math.max(...votes))

  return (
    <div>
      <DisplayAnecdotes title="Anecdote of the day" text={anec[selected]} votes={votes[selected]}/>
      <Button handleClick={()=>setSelected(getRandom(selected))} text="Next anecdote"/>
      <Button handleClick={()=>setVotes(addVote(selected))} text="Vote"/>
      <DisplayAnecdotes title="Anecdote with the most votes" text={anec[getMax()]} votes={votes[getMax()]} />
    </div>
    
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)