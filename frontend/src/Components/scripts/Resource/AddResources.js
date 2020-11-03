import React, { Component } from "react";
import { connect } from "react-redux";
import { onAddingResource } from "../../Redux/Resources/ResourceAction";
import { withRouter } from "react-router-dom";
import { Button, Typography, TextField, Grid } from "@material-ui/core";
import MiniDrawer from "../../reuseable/Drawer";

class AddResources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      classes: "",
      board: "",
      subject: "",
      title: "",
      description: "",
    };
  }

  onFileChange = (e) => {
    this.setState({
      selectedFile: e.target.files[0],
    });
  };

  onFileSubmit = () => {
    const { classes, board, subject, description, title } = this.state;
    const newResource = {
      title,
      class: classes,
      board,
      subject,
      description,
    };
    console.log(newResource);
    console.log(this.state.selectedFile);
    this.props.onAddingResource(this.state.selectedFile, newResource);
  };

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { title, classes, board, subject, description } = this.state;
    return (
      <MiniDrawer>
        <div className="addR">
          <center>
            <h1>Add Resources</h1>
          </center>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                id="standard-basic"
                label="Title"
                name="title"
                value={title}
                onChange={this._onHandleChange}
                className="addRT"
              />

              <TextField
                id="standard-basic"
                label="Standard"
                name="classes"
                value={classes}
                onChange={this._onHandleChange}
                className="addRT"
              />

              <TextField
                id="standard-basic"
                label="Subject"
                name="subject"
                value={subject}
                onChange={this._onHandleChange}
                className="addRT"
              />

              <TextField
              id="standard-basic"
              label="Board"
              name="board"
              value={board}
              onChange={this._onHandleChange}
              className="addRT"
            />

              <TextField
                id="standard-basic"
                label="Description"
                name="description"
                value={description}
                onChange={this._onHandleChange}
                className="addRT"
              />
            </Grid>
          </form>
          {console.log(this.state.selectedFile)}
          {this.state.selectedFile ? (
            <center>
              <div>
                <Typography variant="body2">
                  {this.state.selectedFile.name}
                </Typography>

                <Button
                  color="primary"
                  size="large"
                  variant="contained"
                  component="label"
                  onClick={this.onFileSubmit}
                  className="mt-5"
                >
                  Submit
                </Button>
              </div>
            </center>
          ) : (
            <center>
              <Button
                color="primary"
                size="large"
                variant="contained"
                component="label"
                className="mt-5"
              >
                Upload
                <input
                  type="file"
                  onChange={this.onFileChange}
                  style={{ display: "none" }}
                />
              </Button>
            </center>
          )}
        </div>
      </MiniDrawer>
    );
  }
}

export default connect(null, { onAddingResource })(withRouter(AddResources));
