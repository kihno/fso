import { Alert } from 'react-bootstrap'
import { useNotificationValue } from '../context/notificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  return (
    <div>
      { notification.type === 'ERROR'
        ? <Alert variant='danger'>{notification.message}</Alert>
        : <Alert variant='success'>{notification.message}</Alert>
      }
    </div>
  )
}

export default Notification
