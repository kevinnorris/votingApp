// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Grid, ListGroup} from 'react-bootstrap';

// our packages
import {logoutUser, getPolls} from '../../store/actions';
import pollOverview from '../../components/pollOverview';

// style
import './home.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  getpolls: () => dispatch(getPolls()),
});

const mapStateToProps = state => ({
  isFetching: state.polls.isFetching,
  polls: state.polls.polls,
  name: state.auth.user.github.displayName,
});

class Home extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    polls: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    logout: React.PropTypes.func.isRequired,
    getpolls: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getpolls();
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
        <Grid>
          <ListGroup>
            {pollOverview('pollOverviewTitle', 'Question', 'Votes', 'Author', 'Date', true)}
            {this.props.polls.map(poll =>
              pollOverview(
                poll._id,
                poll.question,
                poll.votes.length,
                poll.author,
                new Date(poll.date).toLocaleString(),
                false))
            }
          </ListGroup>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
