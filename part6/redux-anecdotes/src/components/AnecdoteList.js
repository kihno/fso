import { useDispatch, useSelector } from "react-redux"
import { upVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === '') {
      return anecdotes
    } else {
      return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }
  })

  const vote = (id) => {
    dispatch(upVote(id))
  }

  return(
    <div className="anecdotes">
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
