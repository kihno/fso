import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../reducers/errorReducer'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(null))
    }, 5000)
  }, [error])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000)
  }, [notification])

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      {notification ? <div className="notice">{notification}</div> : null}
    </div>
  )
}

export default Notification
