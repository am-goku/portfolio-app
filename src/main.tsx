import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PortfolioApp from './App'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PortfolioApp />
    </ErrorBoundary>
  </StrictMode>
)
