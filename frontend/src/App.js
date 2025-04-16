import React, { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="App">
      <h1>Research Management System</h1>
      <div className="auth-toggle">
        <button onClick={() => setShowLogin(true)}>Login</button>
        <button onClick={() => setShowLogin(false)}>Register</button>
      </div>
      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default App;
