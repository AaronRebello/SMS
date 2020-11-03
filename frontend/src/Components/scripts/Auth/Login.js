import React, { Component } from "react";
import {connect} from "react-redux"
import { onLogin } from "../../Redux/Authentication/AuthAction";
import { withRouter } from "react-router-dom";
import {Grid,Card,CardContent,TextField,Button} from "@material-ui/core"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  
  }

  componentDidMount() {
    const {isAuthenticated} = this.props.auth
    if(isAuthenticated) {
      this.props.history.push('/dashboard')
    }

  }



  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    const { email, password } = this.state;
    const newUser = {
      email,
      password,
    };
    console.log(newUser);
    this.props.onLogin(newUser, this.props.history);
  };
  render() {
    const { email, password } = this.state;
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
                <h3>Login</h3>
               
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this._onHandleChange}
                />
               
                <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={this._onHandleChange}
              />
                <Button variant="outlined" className="mt-3 ml-3" onClick={this._onSubmit}>Login</Button>
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { onLogin })(withRouter(Login));
