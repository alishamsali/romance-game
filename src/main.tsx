import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Add favicon with heart emoji
const link = document.createElement('link')
link.rel = 'icon'
link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💕</text></svg>'
document.head.appendChild(link)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)