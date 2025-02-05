import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageCRM from './PageCRM'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageCRM />
  </StrictMode>,
)
