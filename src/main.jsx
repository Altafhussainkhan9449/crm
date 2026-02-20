// ============================================================
// main.jsx - Entry point; mounts app with all context providers
// ============================================================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CRMProvider } from './context/CRMContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* AuthProvider must wrap CRMProvider so CRM can access auth if needed */}
    <AuthProvider>
      <CRMProvider>
        <App />
      </CRMProvider>
    </AuthProvider>
  </StrictMode>,
)
