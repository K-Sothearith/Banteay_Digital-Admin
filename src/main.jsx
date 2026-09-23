import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MaintenanceApp from './MaintenanceApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MaintenanceApp />
  </StrictMode>,
)
