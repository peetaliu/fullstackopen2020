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

  const vote = (id, msg) => {
    dispatch(addVote(id))
    dispatch(voteMsg(msg))
    setTimeout(() => {
      dispatch(resetMsg())
    }, 5000)
    console.log('voted: ', id)
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList