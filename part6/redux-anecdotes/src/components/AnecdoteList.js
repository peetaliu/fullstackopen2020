import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { voteMsg, resetMsg } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (!filter) {
      return anecdotes
    }
    return anecdotes.filter(a =>
      a.content.toLowerCase().trim().includes(filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const vote = anec => {
    dispatch(addVote(anec))
    dispatch(voteMsg(anec.content))
    setTimeout(() => {
      dispatch(resetMsg())
    }, 5000)
  }

  return (
    <div>
      {anecdotes
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

export default AnecdoteList
