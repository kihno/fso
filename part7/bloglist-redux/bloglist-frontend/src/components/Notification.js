import { useSelector } from 'react-redux'

const Notification = (props) => {
  const { error } = props

  const notification = useSelector(state => state.notification)

  return (
    <div>
      {error ? <div className="error">{error}</div> : null}
      {notification ? <div className="notice">{notification}</div> : null}
    </div>
  )
}

export default Notification
