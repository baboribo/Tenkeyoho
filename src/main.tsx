import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Gnb from './components/gnb.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gnb />
    <App />
  </StrictMode>
)