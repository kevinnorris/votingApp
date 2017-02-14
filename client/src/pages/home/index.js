// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// our packages
import {logoutUser, getPolls} from '../../store/actions';
import pollOverview from '../../components/pollOverview';

// style
import './home.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  getpolls: payload => dispatch(getPolls(payload)),
});

const mapStateToProps = state => ({
  isFetching: state.polls.isFetching,
  polls: state.polls.polls,
  id: state.auth.user._id,
  token: state.auth.token,
  name: state.auth.user.github.displayName,
});

class Home extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    polls: React.PropTypes.array.isRequired,
    id: React.PropTypes.string.isRequired,
    token: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    logout: React.PropTypes.func.isRequired,
    getpolls: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getpolls({id: this.props.id, token: this.props.token});
  }

  render() {
    return (
      <div className="home">
        <p className="welcome">Welcome, {this.props.name}!</p>
        <div className="link-container">
          <Link to="/profile">Profile</Link>
          <p>|</p>
          <Link to="/login" onClick={this.props.logout}>Logout</Link>
        </div>
        <h1>Home Page</h1>
        <div className="polls">
          {this.props.isFetching ? 'Loading Polls' : this.props.polls.map(poll =>
            pollOverview(poll._id, poll.question, poll.votes.length, poll.author, poll.date.toString()))
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
