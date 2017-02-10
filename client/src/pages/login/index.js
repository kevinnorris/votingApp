// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import popupTools from 'popup-tools';
import {Button} from 'react-bootstrap';
// import {Link} from 'react-router';

// our packages
import {loginSuccess} from '../../store/actions';

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

  render() {
    return (
      <div className="login">
        <h1>FCC Dynamic Web Boilerplate</h1>
        <Button bsStyle="primary" className="socialButton" onClick={this.handelGithubLogin}>
          <img className="logo" src="github_32px.png" alt="github logo" />
          <p>Login With Github</p>
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
