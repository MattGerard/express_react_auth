import * as actions from '../../actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, 'props');
    return (
      <div className="Nav">
        <button type="button" onClick={this.doLogout.bind(this)}>
          Logout
        </button>
        <button type="button" onClick={this.doTwitchlogin.bind(this)}>
          TWITCH
        </button>
      </div>
    );
  }

  doLogout = () => {
    this.props.dispatch(actions.logoutUser());
  };

  doTwitchlogin = () => {
    this.props.dispatch(actions.twitchAuth());
  };
}

export default connect()(Nav);
