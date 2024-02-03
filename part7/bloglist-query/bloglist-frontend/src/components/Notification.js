import { useNotificationValue } from '../context/notificationContext'

const Notification = (props) => {
  const { error } = props

  const notification = useNotificationValue()
  console.log(notification)

  return (
    <div>
      { error ? <div className="error">{error}</div> : null }
      { notification ? <div className="notice">{notification}</div> : null }
    </div>
  )
}

export default Notification
