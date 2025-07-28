import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoadingProvider } from '@contexts/LoadingContext'
import { NotiProvider } from './contexts/NotiContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <NotiProvider>
        <App />
      </NotiProvider>
    </LoadingProvider>
  </StrictMode>,
)
