import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Game from './components/Game.jsx';
import './index.css'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Game />
  </StrictMode>,
)
