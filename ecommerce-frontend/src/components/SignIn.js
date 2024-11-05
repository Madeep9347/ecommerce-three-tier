// src/components/SignIn.js
import React, { useState } from 'react';

function SignIn({ handleSignIn, setIsSignUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignIn(username, password);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow-sm">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign In</button>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
