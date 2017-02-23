import React from 'react';
import {connect} from 'react-redux';
import {Pagination} from 'react-bootstrap';

// our packages
import {getPolls} from '../../store/actions';
import PollList from '../../components/pollList';
import Header from '../../components/header';

import './myPolls.scss';

/*
  Using much of the code from home

  Reusing state.polls.polls and state.polls.numOfPages as every time the user
  navagates to home or myPolls page a new server request is made for the polls.
  This reuse won't affect the user experiance

  activePage, sortByVotes and ascending is not reused so that the users preferences
  stay the same on the home page.
*/

const mapStateToProps = state => ({
  isFetching: state.polls.isFetching,
  polls: state.polls.polls,
  numOfPages: state.polls.numOfPages,
  userId: state.auth.user._id,
});

const mapDispatchToProps = dispatch => ({
  getPolls: payload => dispatch(getPolls(payload)),
});

class MyPolls extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    polls: React.PropTypes.array.isRequired,
    numOfPages: React.PropTypes.number.isRequired,
    userId: React.PropTypes.string.isRequired,
    getPolls: React.PropTypes.func.isRequired,
  }

  state = {
    activePage: 1,
    sortByVotes: false,
    ascending: false,
  }

  componentWillMount() {
    this.props.getPolls({
      ascending: this.state.ascending,
      sortByVotes: this.state.sortByVotes,
      activePage: this.state.activePage,
      userId: this.props.userId,
    });
  }

  handelSelect = (eventKey) => {
    this.setState({
      activePage: eventKey,
    });

    this.props.getPolls({
      ascending: this.state.ascending,
      sortByVotes: this.state.sortByVotes,
      activePage: eventKey,
      userId: this.props.userId,
    });
  }

  handelSortChange = (sortByVotes) => {
    // If clicked on catagory already selected, switch order
    if (this.state.sortByVotes === sortByVotes) {
      this.props.getPolls({
        ascending: !this.state.ascending,
        sortByVotes: this.state.sortByVotes,
        activePage: this.state.activePage,
        userId: this.props.userId,
      });

      this.setState({
        ascending: !this.state.ascending,
      });
    } else {
      // Otherwise switch category with default descending order and first page
      this.props.getPolls({
        ascending: false,
        sortByVotes: !this.state.sortByVotes,
        activePage: 1,
        userId: this.props.userId,
      });

      this.setState({
        ascending: false,
        sortByVotes: !this.state.sortByVotes,
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
            sortByVotes={this.state.sortByVotes}
            ascending={this.state.ascending}
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
            activePage={this.state.activePage}
            onSelect={this.handelSelect}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPolls);
