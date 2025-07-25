import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { NotiProvider } from './components/Notification/NotiProvider.tsx'
import { LoadingProvider } from './components/Loading/LoadingProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <NotiProvider>
        <App />
      </NotiProvider>
    </LoadingProvider>
  </StrictMode>,
)
