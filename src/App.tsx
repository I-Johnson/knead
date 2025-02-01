// src/App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/login';
import SignUpForm from './components/signup';
import Success from './components/success';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <img
        src="/assets/choose.jpeg"
        alt="Choose Option"
        style={{
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <h1>Login or SignUp?</h1>
      <button onClick={() => navigate('/login')}>Go to Login</button>
      <button onClick={() => navigate('/signup')}>Go to Sign Up</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;