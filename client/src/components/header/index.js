// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Jumbotron, Button} from 'react-bootstrap';

// our packages
import {logoutUser} from '../../store/actions';

// style
import './header.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
});

const mapStateToProps = state => ({
  name: state.auth.user ? state.auth.user.github.displayName : '',
});

const NavBar = ({name, logout}) => {
  if (name) {
    return (
      <ul className="header_topnav">
        <li className="header_home"><Link to="/">Home</Link></li>
        <li><Link to="/" onClick={logout}>Logout</Link></li>
        <li className="header_divider"> | </li>
        <li>Hello {name}</li>
      </ul>
    );
  }
  return (
    <ul className="header_topnav">
      <li className="header_home"><Link to="/">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
};

class Header extends React.Component {
  handelLogout = () => {
    this.props.logout();
  }

  render() {
    return (
      <div className="header">
        <div className="container">
          <NavBar name={this.props.name} logout={this.handelLogout} />
        </div>
        <Jumbotron className="text-center header_jumbo">
          <a id="header_title" href="/"><h1>Quick Poll</h1></a>
          {this.props.name ?
            <p>
              <LinkContainer to="/newPoll" className="header_jumboLink">
                <Button bsStyle="success">New Poll</Button>
              </LinkContainer>
              <LinkContainer to="/myPolls" className="header_jumboLink">
                <Button bsStyle="primary">My Polls</Button>
              </LinkContainer>
            </p> :
            ''
          }
        </Jumbotron>
      </div>
    );
  }
}

Header.propTypes = {
  name: React.PropTypes.string.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
