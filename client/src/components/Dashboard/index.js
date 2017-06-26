import * as actions from '../../actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.props.protectedTest();
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>DASHBOARD</h1>
        {this.props.content}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {content: state.auth.content};
}

export default connect(mapStateToProps, actions)(Dashboard);
