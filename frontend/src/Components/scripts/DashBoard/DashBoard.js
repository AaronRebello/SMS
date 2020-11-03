import React, { Component } from "react";
import { connect } from "react-redux";
import MiniDrawer from "../../reuseable/Drawer";
class DashBoard extends Component {
  render() {
    const { user } = this.props.auth;
    return (
      <MiniDrawer>
        <h1>Dashboard</h1>
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
      </MiniDrawer>
    );
  }
}

function mapStatetoProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStatetoProps, {})(DashBoard);
