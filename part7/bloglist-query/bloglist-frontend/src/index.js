import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


import './index.css'
import App from './App'
import { NotificationContextProvider } from './context/notificationContext'
import { UserContextProvider } from './context/userContext'

const queryClient = new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)
