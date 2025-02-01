import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import LoginForm from './components/login'
import App from './App.tsx'
// import SignUpForm from './components/signup.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <SignUpForm /> */}
    {/* <LoginForm /> */}
    <App />
  </StrictMode>,
)
