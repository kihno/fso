import { useNotificationValue } from '../context/notificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <div>
      { notification.type === 'ERROR'
        ? <div className="error">{notification.message}</div>
        : <div className="notice">{notification.message}</div>
      }
      {/* { error ? <div className="error">{error}</div> : null }
      { notification ? <div className="notice">{notification}</div> : null } */}
    </div>
  )
}

export default Notification
