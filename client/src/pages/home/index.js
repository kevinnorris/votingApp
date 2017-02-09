// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
// import {Link} from 'react-router';

// our packages
import {click} from '../../store/actions';

const mapDispatchToProps = dispatch => ({
  addClick: payload => dispatch(click(payload)),
});

const mapStateToProps = state => ({
  clicks: state.clicks.clicks,
  id: state.auth.user._id,
  token: state.auth.token,
});

const Home = ({clicks, addClick, id, token}) => {
  const handelClick = () => {
    addClick({id, token});
  };

  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Clicks: {clicks}</h2>
      <Button onClick={handelClick}>Click</Button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
