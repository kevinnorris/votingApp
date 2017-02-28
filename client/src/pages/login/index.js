// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import popupTools from 'popup-tools';
import {Button} from 'react-bootstrap';

// our packages
import {loginSuccess} from '../../store/actions';
import Header from '../../components/header';

import './login.scss';

const mapDispatchToProps = dispatch => ({
  loginSuccess: payload => dispatch(loginSuccess(payload)),
  changeRoute: url => dispatch(push(url)),
});

const mapStateToProps = state => ({
  token: state.auth.token,
});

class Login extends React.Component {
  static defaultProps = {
    token: null,
  }
  static propTypes = {
    token: React.PropTypes.string,
    changeRoute: React.PropTypes.func,
    loginSuccess: React.PropTypes.func,
  }

  componentWillMount() {
    // If we already have a token, redirect to home page
    // happens before component mounts
    if (this.props.token) {
      this.props.changeRoute('/');
    }
  }

  handelGithubLogin = () => {
    popupTools.popup('http://localhost:8080/auth/github', 'Github Connect', {}, (err, response) => {
      if (err) {
        alert(err.message);
      } else {
        if (response.success) {
          this.props.loginSuccess({token: response.token, user: response.user});
          // redirect to home
          this.props.changeRoute('/');
        } else {
          alert('Error logging into github.');
        }
      }
    });
  }

  handelGoogleLogin = () => {
    popupTools.popup('http://localhost:8080/auth/google', 'Google Connect', {}, (err, response) => {
      if (err) {
        alert(err.message);
      } else {
        if (response.success) {
          this.props.loginSuccess({token: response.token, user: response.user});
          // redirect to home
          this.props.changeRoute('/');
        } else {
          alert('Error logging into google.');
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container login">
          <Button bsStyle="info" className="socialButton" onClick={this.handelGithubLogin}>
            <img className="logo" src="github_32px.png" alt="github logo" />
            <p>Sign in With Github</p>
          </Button>
          <br />
          <button className="login_googleSignInBtn" onClick={this.handelGoogleLogin} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
