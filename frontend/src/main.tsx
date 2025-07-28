import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoadingProvider } from '@contexts/LoadingContext'
import { NotiProvider } from './contexts/NotiContext'
import { UserProvider } from '@contexts/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <NotiProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotiProvider>
    </LoadingProvider>
  </StrictMode>,
)
