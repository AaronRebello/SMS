

import React, { Component } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Typography,
  Grid,
  Button,
  TextField,
  Modal,
} from "@material-ui/core";
import MiniDrawer from "../../reuseable/Drawer";
import AddButton from "../../reuseable/AddButton";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { onFetchingStudent } from "../../Redux/Students/StudentAction";
import { EditStudent } from "../../Redux/Students/StudentAction";
import { deleteStudent } from "../../Redux/Students/StudentAction";
import { DATA_STATE } from "../../Redux/dataState";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core/styles";
import { green, yellow, blue } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import { Search } from "@material-ui/icons";
const useStyles = (theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 380,
    backgroundColor: theme.palette.background.paper,

    border: "5px solid yellow",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // margin: 100,
    margin: theme.spacing(10, 150, 30),
  },

  TextField: { width: 500, backgroundColor: blue },
});

class Student extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalResource: null,
      searchQuery: "",
      open: false,
      student: null,
      name: "",
      sclass: "",
      board: "",
      marks: "",
      performance: "",
      fees: "",
      id : ''
    };
  }

  componentDidMount() {
    this.props.onFetchingStudent();
  }

  onHandleChanges = (e) => {
    let query = e.target.value;
    console.log(query);
    if (query.length == 0) {
      this.setState({
        finalResource: null,
      });
    }
    this.setState({
      searchQuery: query,
    });
    // console.log(this.props.student.student);
    let filteredArray = this.props.student
      ? this.props.student.student.filter((student) => {
          console.log(student.name.toLowerCase() == query.toLowerCase());
          let contentQuery = student.name.toLowerCase();
          return contentQuery.indexOf(query) !== -1;
        })
      : [];

    console.log(filteredArray);

    this.setState({
      finalResource: filteredArray,
    });
  };

  OnDelete = (student) => {
    console.log(student);
    this.props.deleteStudent(student);
  };

  onEdit = (student) => {
    console.log(student);
    this.setState({
      open: !this.state.open,
      id : student._id,
      student: student,
      name: student.name,
      sclass: student.class,
      board: student.board,
      marks: student.marks,
      performance: student.performance,
      fees: student.fees,
    });
  };

  onEditSubmit = () => {
    let { id,name, sclass, board, marks, performance, fees } = this.state;
    // console.log(id);

    let obj = {
      id,
      name,
      class: sclass,
      board,
      marks,
      performance,
      fees,
    };
    // console.log(obj);
    this.props.EditStudent(obj);
    this.setState({
      open: false,
    });
  };

  onHandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    // console.log(this.props.auth);
    // console.log(this.props.student);
    const {
      name,
      sclass,
      board,
      marks,
      performance,
      fees,
    } = this.state;
    const { classes } = this.props;
    const { dataState } = this.props.student;
    if (
      dataState === DATA_STATE.NOT_INITIALIZED ||
      dataState === DATA_STATE.FETCHING
    ) {
      return (
        <MiniDrawer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <CircularProgress />
              </div>
            </div>
          </div>
        </MiniDrawer>
      );
    } else if (dataState === DATA_STATE.FETCHED_FAILED) {
      return (
        <MiniDrawer>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="h4">
                  something went wrong, please try again later.
                </Typography>
              </div>
            </div>
          </div>
        </MiniDrawer>
      );
    } else {
      const { student } = this.props.student;
      // const { user } = this.props.auth;

      //   if(resources){
      if (student.length > 0) {
        return (
          <MiniDrawer>
            <div className="container">
              <Icon className="fa fa-plus-circle" color="primary" />

              <center>
                <h1>Students</h1>
              </center>
              <Search fontSize="large" color="dark"></Search>

              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search..."
                aria-label="Search"
                value={this.state.searchQuery}
                onChange={this.onHandleChanges}
                className="Rinput"
              ></input>

              <div className="row">
                {this.state.finalResource ? (
                  <React.Fragment>
                    {this.state.finalResource.map((val) => (
                      <div className="col-md-4">
                        <Card className="mt-4">
                          <CardContent>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">Name</h6>

                              {val.name}
                            </Typography>

                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">STANDARD</h6>

                              {val.class}
                            </Typography>

                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">MARKS</h6>

                              {val.marks}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">PERFORMANCE</h6>

                              {val.performance}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">BOARD</h6>

                              {val.board}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">FEES</h6>

                              {val.fees}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Button
                              onClick={this.OnDelete.bind(this, val)}
                              size="small"
                              className="ml-5"
                              color="primary"
                            >
                              Delete
                            </Button>

                            <Button
                              onClick={this.onEdit.bind(this, val)}
                              size="small"
                              className="ml-5"
                              color="primary"
                            >
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    ))}
                  </React.Fragment>
                ) : (
                  <div className="col-md-12">
                    <div className="row">
                      {student.map((student) => (
                        <div className="col-md-4" key={student._id}>
                          <Card className="mt-4">
                            <CardContent>
                              <Typography variant="h5" className="Rh5 ">
                                <h6 className="Rh6">NAME</h6>
                                {student.name}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">STANDARD</h6>
                                {student.class}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">MARKS</h6>
                                {student.marks}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">PERFORMANCE</h6>
                                {student.performance}
                              </Typography>
                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">BOARD</h6>
                                {student.board}
                              </Typography>
                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">FEES</h6>
                                {student.fees}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                onClick={this.OnDelete.bind(this, student)}
                                size="small"
                                className="ml-5"
                                variant="outlined"
                                color="primary"
                              >
                                Delete
                              </Button>

                              <Button
                                onClick={this.onEdit.bind(this, student)}
                                size="small"
                                className="ml-5"
                                variant="outlined"
                                color="primary"
                              >
                                Edit
                              </Button>
                            </CardActions>
                          </Card>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <Modal
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              className={classes.paper}
            >
              <div>
                <form  className={classes.root} noValidate autoComplete="off">
                  <center>
                    <TextField
                      id="standard-basic"
                      label="Name"
                      name="name"
                      value={name}
                      onChange={(e) =>
                        this.setState({ name: e.target.value })
                      }
                      // className="addRT"
                    />

                    <TextField
                      id="standard-basic"
                      label="Standard"
                      name="sclass"
                      value={sclass}
                      onChange={(e) =>
                        this.setState({ sclass: e.target.value })
                      }
                      // className="addRT"
                    />

                    <TextField
                      id="standard-basic"
                      label="Marks"
                      name="marks"
                      value={marks}
                      onChange={(e) =>
                        this.setState({ marks: e.target.value })
                      }
                      // className="addRT"
                    />

                    <TextField
                      id="standard-basic"
                      label="Performance"
                      name="performance"
                      value={performance}
                      onChange={(e) =>
                        this.setState({ performance: e.target.value })
                      }
                      // className="addRT"
                    />
                       
                    <TextField
                    id="standard-basic"
                    label="Board"
                    name="board"
                    value={board}
                    onChange={(e) =>
                      this.setState({ board: e.target.value })
                    }
                    // className="addRT"
                  />
                    <TextField
                      id="standard-basic"
                      label="Fees"
                      name="fees"
                      value={fees}
                      onChange={(e) =>
                        this.setState({ fees: e.target.value })
                      }
                      // className="addRT"
                    />
                  </center>
                </form>
                <Button
                  onClick={this.onEditSubmit.bind(this)}
                  variant="contained"
                  className="ml-5 mt-3"
                  style={{marginLeft:120,}}

                >
                  Edit
                </Button>
              </div>
            </Modal>

            </div>
          </MiniDrawer>
        );
      }
      // }
      else {
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Typography variant="h4">
                  no resource found please start adding one.
                </Typography>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    // resource: state.resource,
    // auth: state.auth,
    student: state.student,
  };
}
export default connect(mapStateToProps, {
  onFetchingStudent,
  EditStudent,
  deleteStudent,
})(withStyles(useStyles)(withRouter(Student)));
