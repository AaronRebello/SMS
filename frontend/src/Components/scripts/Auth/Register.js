import React, { Component } from "react";
import { connect } from "react-redux";
import { onRegister } from "../../Redux/Authentication/AuthAction";
import { withRouter } from "react-router-dom";
import {Grid,Card,CardContent,TextField,Button} from "@material-ui/core"
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      branch: "",
      password: "",
    };
  }

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const { name, email, branch, password } = this.state;
    const  newUser  = {
      name,
      email,
      branch,
      password,
    };
    this.props.onRegister( newUser , this.props.history);
  };
  render() {
    const { name, email, branch, password } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Card>
                <CardContent>
               
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                  <h3>Register</h3>
                  <TextField
                  label="Name"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this._onHandleChange}
                />
                  <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this._onHandleChange}
                  />
                  <TextField
                    label="Branch"
                    type="text"
                    name="branch"
                    value={branch}
                    onChange={this._onHandleChange}
                  />
                  <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this._onHandleChange}
                />
                  <Button variant="outlined" className="mt-3 ml-3" onClick={this._onSubmit}>Register</Button>
                  </Grid>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { onRegister })(withRouter(Register));