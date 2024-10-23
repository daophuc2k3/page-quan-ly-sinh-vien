import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <App />
      <Toaster />
    </ToastProvider>
  </StrictMode>,
)
