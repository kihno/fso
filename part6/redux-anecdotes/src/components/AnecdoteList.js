import { useDispatch, useSelector } from "react-redux"
import { upVote } from "../reducers/anecdoteReducer"
import { setMessage, clearMessage, setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })
  const sorted = anecdotes.slice().sort((a,b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(upVote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    // dispatch(setMessage({type: 'VOTE', content}))
    // setTimeout(() => dispatch(clearMessage()), 5000)
  }

  return(
    <div className="anecdotes">
      {sorted.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
