import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './context/Store.jsx'

createRoot(document.getElementById('root')).render(
  <Store>
    <App />
  </Store>,
)
