import * as actions from '../../actions';
import {logoutUser} from '../../actions';
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
      </div>
    );
  }

  doLogout = () => {
    this.props.dispatch(logoutUser());
  };
}

export default connect()(Nav);
