import * as actions from '../../actions';
import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, 'props');
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Home</h1>
        {this.props.content}
      </div>
    );
  }
}

export default connect()(Home);
