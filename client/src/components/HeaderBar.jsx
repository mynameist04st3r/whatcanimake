import './HeaderBar.css';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function LoginForm({ onSubmit, username, password, setUsername, setPassword, loginError, setLoginError }) {
  const handleLogin = async () => {
    console.log('handleLogin called')
    try {
      const response = await axios.post(`http://localhost:8000/login`, {
        username,
        password,
      });
      console.log('Response data:', response.data);
      if (response.data.success) {
        console.log('Login successful');
        setSignedIn(true);
        setLoginForm(false);
        setUsername('');
        setPassword('');
        setLoginError(null);
      } else {
        console.log('Login failed');
        setLoginError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-form-container" style={{ position: 'fixed', top: 60, right: 0, background: '#eb8921', padding: 10, border: '1px solid #93c560', borderRadius: 5, boxShadow: '0 0 10px rgba(0,0,0,0.2)', zIndex: 1000 }}>
      <form onSubmit={handleLogin}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
function SignUpForm({ onSubmit, username, password, confirmPassword, setUsername, setPassword, setConfirmPassword, signUpError, setSignUpError }) {
  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        setSignUpError('Passwords do not match');
        return;
      }
      if (!username || !password || !confirmPassword) {
        setSignUpError('Please fill out all fields');
        return;
      }
      const response = await axios.post(`http://localhost:8000/signup`, {
        username,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        onSubmit();
      } else {
        setSignUpError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="sign-up-form-container" style={{ position: 'fixed', top: 60, right: 0, background: '#eb8921', padding: 10, border: '1px solid #93c560', borderRadius: 5, boxShadow: '0 0 10px rgba(0,0,0,0.2)', zIndex: 1000 }}>
      <form onSubmit={handleSignUp}>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Create Username'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <input
          type='password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder='Confirm Password'
        />
        {signUpError && <p style={{ color: 'red' }}>{signUpError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
function HeaderBar() {
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  const [loginForm, setLoginForm] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const handleLoginToggle = () => {
    setLoginForm(!loginForm);
    setSignUpForm(false);
  };
  const handleSignUpToggle = () => {
    setSignUpForm(!signUpForm);
    setLoginForm(false);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:8000/login`, {
        username,
        password,
      });
      if (response.data.success) {
        setSignedIn(true);
        setLoginForm(false);
        setUsername('');
        setPassword('');
        setLoginError(null);
      } else {
        setLoginError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/signup`, {
        username,
        password,
        confirmPassword,
      });
      if (response.data.success) {
        setSignedIn(true);
        setSignUpForm(false);
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setSignUpError(null);
      } else {
        setSignUpError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="header-component-container">
        <h1>What CAN I make?</h1>
        <div className="header-buttons-container">
          <button className="header-buttons" onClick={handleLoginToggle}>Login</button>
          <button className="header-buttons" onClick={handleSignUpToggle}>Sign Up</button>
        </div>
      </div>
      {loginForm && createPortal(
        <LoginForm
          onSubmit={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          loginError={loginError}
          setLoginError={setLoginError}
        />,
        document.body
      )}
      {signUpForm && createPortal(
        <SignUpForm
          onSubmit={handleSignUp}
          username={username}
          password={password}
          confirmPassword={confirmPassword}
          setUsername={setUsername}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
          signUpError={signUpError}
          setSignUpError={setSignUpError}
        />,
        document.body
      )}
    </div>
  );
}
export default HeaderBar;
