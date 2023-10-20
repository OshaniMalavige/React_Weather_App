import React, { Component } from 'react';
import Home from "../components/Home";
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
    };
  }

  handleUsernameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleLogin = () => {
    const { username, password } = this.state;
    
    // Hardcoded username and password for demonstration purposes
    if (username === 'oshani' && password === '123456') {
      this.setState({ loggedIn: true });
    } else {
      alert('Invalid credentials. Please try again.');
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <>
          <Home/>
        </>
      );
    }

    return (
        <div className="main-login">
          <div className="left-login">
            <img src='https://www.sigmatechapps.com/images/Background.png' className="left-login-image" alt="Pessoa trabalhando"/>
          </div>

          <div className="right-login">
            <div className="card-login">
              <h1>LOGIN</h1>
              <div className="textfield">
                <label>Username</label>
                <input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="John"/>
              </div>
              <div className="textfield">
                <label>Password</label>
                <input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
              </div>
              <button className="btn-login" onClick={this.handleLogin}>Login</button>
            </div>
          </div>
        </div>
    );
  }
}

export default Login;
