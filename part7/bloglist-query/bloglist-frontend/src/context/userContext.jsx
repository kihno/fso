import { createContext, useContext, useReducer } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
  case 'CREATE':
    return action.payload
  case 'DELETE':
    return null
  default:
    return state
  }
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return(
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const notificationAndDispatch = useContext(UserContext)
  return notificationAndDispatch[0]
}

export const useUserDispatch = () => {
  const notificationAndDispatch = useContext(UserContext)
  return notificationAndDispatch[1]
}

export default UserContext
