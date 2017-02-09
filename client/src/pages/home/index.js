// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
// import {Link} from 'react-router';

// our packages
import {updateClicks} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  addClick: payload => dispatch(updateClicks(payload)),
});

const mapStateToProps = state => ({
  clicks: state.clicks.clicks,
  isFetching: state.clicks.isFetching,
  id: state.auth.user._id,
  token: state.auth.token,
});

const Home = ({clicks, isFetching, addClick, id, token}) => {
  const handelClick = () => {
    addClick({id, token});
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Clicks: {isFetching ? '-' : clicks}</h2>
      <Button onClick={handelClick}>Click</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
