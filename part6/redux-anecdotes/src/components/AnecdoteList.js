import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anec => {
    props.addVote(anec)
    props.setNotification(`Voted for ${anec.content}`, 5)
  }

  return (
    <div>
      {props.anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

const mapStateToProps = state => {
  if (!state.filter) {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter,
    }
  }

  const filteredAnecs = state.anecdotes.filter(a =>
    a.content.toLowerCase().trim().includes(state.filter.toLowerCase())
  )

  return {
    anecdotes: filteredAnecs,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
