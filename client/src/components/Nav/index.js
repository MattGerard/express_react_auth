import React from 'react';
import {logoutUser} from '../../actions';
import {connect} from 'react-redux';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.dispatch);
  }

  render() {
    return (
      <div className="Nav">
        <button type="button" onClick={this.doLogout.bind(this)}>Logout</button>
      </div>
    );
  }
  doLogout = () => {
    console.log('try to logout');
    this.props.dispatch(logoutUser());
  };
}

export default connect()(Nav);
