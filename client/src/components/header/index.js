// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Jumbotron, Button} from 'react-bootstrap';

// our packages
import {logoutUser, getAnonUser} from '../../store/actions';

// style
import './header.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  getAnonUser: () => dispatch(getAnonUser()),
});

const mapStateToProps = state => ({
  userId: state.auth.user._id,
  name: state.auth.user.name ? state.auth.user.github.displayName : '',
});

const NavBar = ({name, logout}) => {
  if (name) {
    return (
      <ul className="header_topnav">
        <li className="header_home"><Link to="/">Home</Link></li>
        <li><a href="/" onClick={logout}>Logout</a></li>
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
  componentWillMount() {
    if (this.props.userId === null) {
      this.props.getAnonUser();
    }
  }

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
          <Link to="/" id="header_title"><h1>Quick Poll</h1></Link>
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
  userId: React.PropTypes.string,
  logout: React.PropTypes.func.isRequired,
  getAnonUser: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
