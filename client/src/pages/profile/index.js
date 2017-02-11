// npm packages
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

// style
import './profile.scss';

const mapStateToProps = state => ({
  id: state.auth.user.github.id,
  username: state.auth.user.github.username,
  displayName: state.auth.user.github.displayName,
  repositories: state.auth.user.github.publicRepos,
});

const Profile = ({id, username, displayName, repositories}) => (
  <div className="github-profile">
    <img src="gh-mark-32px.png" alt="github logo" />
    <p>ID: {id}</p>
    <p>Username: {username}</p>
    <p>Display Name: {displayName}</p>
    <p>Repositories: {repositories}</p>
    <Link className="menu" to="/">Home</Link>
    <p id="menu-divide">|</p>
    <Link className="menu" to="/logout">Logout</Link>
  </div>
);

export default connect(mapStateToProps)(Profile);
