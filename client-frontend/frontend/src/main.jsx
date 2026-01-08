import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/resident/global.css'
import './styles/mobile-responsive.css'
import './styles/visual-polish.css'
import App from './App.jsx'
import { ToastProvider } from './components/Toast.jsx'
import { ConfirmProvider } from './components/ConfirmDialog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </ToastProvider>
  </StrictMode>,
)
