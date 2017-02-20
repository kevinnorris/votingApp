// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Grid, ListGroup, Pagination} from 'react-bootstrap';

// our packages
import {logoutUser, getPolls, changePage} from '../../store/actions';
import pollOverview from '../../components/pollOverview';

// style
import './home.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  getpolls: () => dispatch(getPolls()),
  changePage: payload => dispatch(changePage(payload)),
});

const mapStateToProps = state => ({
  isFetching: state.polls.isFetching,
  polls: state.polls.polls,
  activePage: state.polls.activePage,
  numPages: state.polls.numberOfPages,
  name: state.auth.user ? state.auth.user.github.displayName : '',
  sortByVotes: state.polls.sortByVotes,
});

class Home extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    polls: React.PropTypes.array,
    name: React.PropTypes.string,
    sortByVotes: React.PropTypes.bool,
    activePage: React.PropTypes.number.isRequired,
    numPages: React.PropTypes.number.isRequired,
    logout: React.PropTypes.func.isRequired,
    getpolls: React.PropTypes.func.isRequired,
    changePage: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.getpolls();
  }

  handelLogout = () => {
    this.props.logout();
  }

  handelSelect = (eventKey) => {
    console.log(`Page selected: ${eventKey}`);
  }

  handelToggelSort = () => {
    console.log('Sort changed');
  }

  render() {
    return (
      <div className="home">
        <h1>Quick Poll</h1>
        {this.props.name ? <p className="welcome">Welcome, {this.props.name}!</p> : ''}
        <div className="link-container">
          {this.props.name ? <Link to="/profile">Profile</Link> : ''}
          <p>|</p>
          {this.props.name ?
            <Link to="/" onClick={this.handelLogout}>Logout</Link> :
            <Link to="/login">Login</Link>
          }
        </div>
        <Grid>
          <ListGroup id="home_PollList">
            {pollOverview(
              'pollOverviewTitle',
              'Question', 'Votes',
              'Author', 'Date',
              true,
              this.props.sortByVotes,
              this.handelToggelSort,
              )}
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
        <Pagination
          id="home_pageSelection"
          prev
          next
          ellipsis
          boundaryLinks
          items={this.props.numPages}
          maxButtons={5}
          activePage={this.props.activePage}
          onSelect={this.handelSelect}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
