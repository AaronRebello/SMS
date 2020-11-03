import React, { Component } from "react";
import { connect } from "react-redux";
import { onAddingStudent } from "../../Redux/Students/StudentAction";
import { withRouter } from "react-router-dom";
import { Button, Typography, TextField, Grid } from "@material-ui/core";
import MiniDrawer from "../../reuseable/Drawer";

class AddStudents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentId: "",
      name: "",
      classes: "",
      board: "",
      marks: "",
      performance: "",
      fees: "",
    };
  }

  //   onFileChange = (e) => {
  //     this.setState({
  //       selectedFile: e.target.files[0],
  //     });
  //   };

  //   onFileSubmit = () => {
  //     const { classes, board, subject, description, title } = this.state;
  //     const newResource = {
  //       title,
  //       class: classes,
  //       board,
  //       subject,
  //       description,
  //     };
  //     console.log(newResource);
  //     this.props.onAddingResource(newResource);
  //   };

  _onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  _onSubmit = () => {
    let { name, classes, board, marks, performance, fees } = this.state;
    let newStudent = {
      name,
      class: classes,
      board,
      marks,
      performance,
      fees,
    };
    console.log(this.state);
    console.log(newStudent);
    this.props.onAddingStudent(newStudent);
  };

  render() {
    const {
      studentId,
      name,
      classes,
      board,
      marks,
      performance,
      fees,
    } = this.state;
    return (
      <MiniDrawer>
        <div className="addR">
          <center>
            <h1>Add Students</h1>
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
                label="Name"
                name="name"
                value={name}
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
                label="Board"
                name="board"
                value={board}
                onChange={this._onHandleChange}
                className="addRT"
              />

              <TextField
                id="standard-basic"
                label="marks"
                name="marks"
                value={marks}
                onChange={this._onHandleChange}
                className="addRT"
              />
              <TextField
                id="standard-basic"
                label="performance"
                name="performance"
                value={performance}
                onChange={this._onHandleChange}
                className="addRT"
              />
              <TextField
                id="standard-basic"
                label="fees"
                name="fees"
                value={fees}
                onChange={this._onHandleChange}
                className="addRT"
              />
              <Button
                color="primary"
                size="large"
                variant="contained"
                component="label"
                className="mt-5"
                onClick={this._onSubmit}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </MiniDrawer>
    );
  }
}

export default connect(null, { onAddingStudent })(withRouter(AddStudents));
