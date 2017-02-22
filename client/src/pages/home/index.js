// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Grid, ListGroup, Pagination} from 'react-bootstrap';

// our packages
import {logoutUser, getPolls, changePage} from '../../store/actions';
import PollList from '../../components/pollList';
import Header from '../../components/header';

// style
import './home.scss';

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  getpolls: payload => dispatch(getPolls(payload)),
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
    this.props.getpolls({
      ascending: this.props.ascending,
      sortByVotes: this.props.sortByVotes,
      activePage: this.props.activePage,
    });
  }

  handelLogout = () => {
    this.props.logout();
  }

  handelSelect = (eventKey) => {
    this.props.getpolls({
      ascending: this.props.ascending,
      sortByVotes: this.props.sortByVotes,
      activePage: eventKey,
    });
  }

  handelSortChange = (sortByVotes) => {
    // If clicked on catagory already selected, switch order
    if (this.props.sortByVotes === sortByVotes) {
      this.props.getpolls({
        ascending: !this.props.ascending,
        sortByVotes: this.props.sortByVotes,
        activePage: this.props.activePage,
      });
    } else {
      // Otherwise switch category with default descending order and first page
      this.props.getpolls({
        ascending: false,
        sortByVotes: !this.props.sortByVotes,
        activePage: 1,
      });
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container text-center">
          <PollList
            sortByVotes={this.props.sortByVotes}
            ascending={this.props.ascending}
            sortChange={this.handelSortChange}
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
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
