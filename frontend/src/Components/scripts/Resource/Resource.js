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
import { onFetchingResource } from "../../Redux/Resources/ResourceAction";
import { EditResource } from "../../Redux/Resources/ResourceAction";
import { deleteResource } from "../../Redux/Resources/ResourceAction";
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
    height: 330,
    backgroundColor: theme.palette.background.paper,

    border: "5px solid yellow",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // margin: 100,
    margin: theme.spacing(15, 150, 30),
  },

  TextField: { width: 500, backgroundColor: blue },
});

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalResource: null,
      searchQuery: "",
      open: false,
      resource: null,
      classs: "",
      board: "",
      subject: "",
      title: "",
      description: "",
      id: "",
    };
  }

  componentDidMount() {
    this.props.onFetchingResource();
    console.log(this.props.onFetchingResource())
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
    console.log(this.props.resource.resources);
    let filteredArray = this.props.resource
      ? this.props.resource.resource.filter((resource) => {
          console.log(resource.title.toLowerCase() == query.toLowerCase());
          let contentQuery = resource.title.toLowerCase();
          return contentQuery.indexOf(query) !== -1;
        })
      : [];

    console.log(filteredArray);

    this.setState({
      finalResource: filteredArray,
    });
  };

  OnDelete = (resource) => {
    console.log(resource);
    this.props.deleteResource(resource);
  };

  onEdit = (resource) => {
    this.setState({
      open: !this.state.open,
      resource: resource,
      id: resource._id,
      classs: resource.class,
      board: resource.board,
      subject: resource.subject,
      title: resource.title,
      description: resource.description,
    });
  };

  onEditSubmit = () => {
    const { id, title, description, board, subject, classs } = this.state;
    console.log(id);

    let obj = {
      id,
      title,
      description,
      board,
      subject,
      class: classs,
    };
    console.log(obj);
    this.props.EditResource(obj);
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
    console.log(this.props.auth);
    console.log(this.props.resource);
    const { board, subject, title, description, classs } = this.state;
    const { classes } = this.props;
    const { dataState } = this.props.resource;
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
      const { resource } = this.props.resource;
      const { user } = this.props.auth;

      //   if(resources){
      if (resource.length > 0) {
        return (
          <MiniDrawer>
            <div className="container">
              <Icon className="fa fa-plus-circle" color="primary" />

              <center>
                <h1>Resources</h1>
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
                            <Typography variant="h5" className="Rh5 ">
                              <h6 className="Rh6">TITLE</h6>

                              {val.title}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">STANDARD</h6>

                              {val.class}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">SUBJECT</h6>

                              {val.subject}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">BOARD</h6>

                              {val.board}
                            </Typography>
                            <Typography variant="h5" className="mt-3">
                              <h6 className="Rh6">DESCRIPTION</h6>

                              {val.description}
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
                      {resource.map((resource) => (
                        <div className="col-md-4" key={resource._id}>
                          <Card className="mt-4">
                            <CardContent>
                              <Typography variant="h5" className="Rh5 ">
                                <h6 className="Rh6">TITLE</h6>
                                {resource.title}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">STANDARD</h6>
                                {resource.class}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">SUBJECT</h6>
                                {resource.subject}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">BOARD</h6>
                                {resource.board}
                              </Typography>

                              <Typography variant="h5" className="Rh5 mt-3">
                                <h6 className="Rh6">DESCRIPTION</h6>
                                {resource.description}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                onClick={this.OnDelete.bind(this, resource)}
                                size="small"
                                className="ml-5"
                                variant="outlined"
                                color="primary"
                              >
                                Delete
                              </Button>

                              <Button
                                onClick={this.onEdit.bind(this, resource)}
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
                  <form className={classes.root} noValidate autoComplete="off">
                    <center>
                      <TextField
                        id="standard-basic"
                        label="Title"
                        name="title"
                        value={title}
                        onChange={(e) =>
                          this.setState({ title: e.target.value })
                        }
                        // className="addRT"
                      />

                      <TextField
                        id="standard-basic"
                        label="Standard"
                        name="classs"
                        value={classs}
                        onChange={(e) =>
                          this.setState({ classs: e.target.value })
                        }
                        // className="addRT"
                      />

                      <TextField
                        id="standard-basic"
                        label="Subject"
                        name="subject"
                        value={subject}
                        onChange={(e) =>
                          this.setState({ subject: e.target.value })
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
                        label="Description"
                        name="description"
                        value={description}
                        onChange={(e) =>
                          this.setState({ description: e.target.value })
                        }
                        // className="addRT"
                      />
                    </center>
                  </form>
                  <Button
                    onClick={this.onEditSubmit.bind(this)}
                    variant="contained"
                    className=" mt-3"
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
    resource: state.resource,
    auth: state.auth,
  };
}
export default connect(mapStateToProps, {
  onFetchingResource,
  EditResource,
  deleteResource,
})(withStyles(useStyles)(withRouter(Resource)));
