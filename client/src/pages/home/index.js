// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Grid, ListGroup, Pagination} from 'react-bootstrap';

// our packages
import {logoutUser, getPolls, changePage} from '../../store/actions';
import PollList from '../../components/pollList';

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
  numOfPages: state.polls.numOfPages,
  name: state.auth.user ? state.auth.user.github.displayName : '',
  sortByVotes: state.polls.sortByVotes,
  ascending: state.polls.ascending,
});

class Home extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    polls: React.PropTypes.array,
    name: React.PropTypes.string,
    sortByVotes: React.PropTypes.bool,
    ascending: React.PropTypes.bool,
    activePage: React.PropTypes.number.isRequired,
    numOfPages: React.PropTypes.number.isRequired,
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
    // TODO call getPolls with current sort oreder and new active page
  }

  handelToggelSort = (type) => {
    console.log(`Sort changed for ${type}`);
    // TODO call getPolls with new sort order and no active page
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
        <PollList
          sortByVotes={this.props.sortByVotes}
          ascending={this.props.ascending}
          toggleSort={this.handelToggelSort}
          polls={this.props.polls}
        />
        <Pagination
          id="home_pageSelection"
          prev
          next
          ellipsis
          boundaryLinks
          items={this.props.numOfPages}
          maxButtons={5}
          activePage={this.props.activePage}
          onSelect={this.handelSelect}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
