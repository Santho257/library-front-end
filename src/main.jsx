import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './contexts/AuthenticationContext.jsx'
import { StompContextProvider } from './contexts/StompClientContext.jsx'
import { MessagesContext, MessagesContextProvider } from './contexts/MessagesContext.jsx'
import { ReceiverContextProvider } from './contexts/ReceiverContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthenticationContextProvider>
        <ReceiverContextProvider>
          <MessagesContextProvider>
            <StompContextProvider>
              <App />
            </StompContextProvider>
          </MessagesContextProvider>
        </ReceiverContextProvider>
      </AuthenticationContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
