import React, { useState } from 'react';

function Login({ onLogin, loginError }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!username){
      setError("Username field is required!");
      return;
    }

    if(username.length < 3){
      setError("Username field must be at least 3 characters");
      return;
    }

    if(!password){
      setError("Password field is required!");
      return;
    }

    if(password.length < 8){
      setError("Password must be at least 8 characters long!");
      return;
    }

    let numberCount = Array
      .from(password)
      .reduce((count, value) => value >= '0' && value <= '9' ? count + 1 : count, 0);

    if(numberCount < 3){
      setError("Password must have at least 3 numbers");
      return;
    }
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      {loginError && <p className="error" style={{ color: 'red' }}>{loginError}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
