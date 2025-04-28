import React, { useState } from 'react';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [userData, setUserData] = useState(null);

  return (
    <div className="App">
      <h1>Research Management System</h1>
      {currentPage === 'home' ? (
        <Home 
          user={userData} 
          onLogout={() => setCurrentPage('login')}
        />
      ) : (
        <>
          <button onClick={() => setCurrentPage('login')}>Login</button>
          <button onClick={() => setCurrentPage('register')}>Register</button>
          {currentPage === 'login' ? <Login onHomeClick={(user) => {
            setUserData(user);
            setCurrentPage('home');
          }} /> : <Register />}
        </>
      )}
    </div>
  );
}

export default App;
