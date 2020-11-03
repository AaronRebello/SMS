import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./Components/scripts/Auth/Register";
import Login from "./Components/scripts/Auth/Login";
import setAuthToken from "./Components/utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { onLoginSuccess } from "./Components/Redux/Authentication/AuthAction";
import DashBoard from "./Components/scripts/DashBoard/DashBoard";
import PrivateRoute from "../src/Components/reuseable/PrivateRoute"
import Resource from "./Components/scripts/Resource/Resource";
import AddResources from "./Components/scripts/Resource/AddResources";
import Example from "./Components/scripts/hooks/Example";
import ResourceHooks from "./Components/scripts/Resource/ResourceHooks";
import Partials from "./Components/scripts/Partials/Partials";
import Student from "./Components/scripts/Student/Student";
import AddStudents from "./Components/scripts/Student/AddStudents";
function App() {
  if (localStorage.getItem("jwtToken")) {
    let token = localStorage.getItem('jwtToken')
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(onLoginSuccess(decoded));
  }
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <Route exact path="/addresource" component={AddResources} />
        <Route exact path="/example" component={Example} />
        <PrivateRoute exact path="/dashboard" component={DashBoard} />
        <PrivateRoute exact path="/resources" component={Resource} />
        <PrivateRoute exact path="/students" component={Student}/>
        <Route exact path="/addstudent" component={AddStudents}/>
        <Route exact path="/hooksResource" component={ResourceHooks} />
        <Route exact path="/partials" component={Partials} />
      </Router>
    </Provider>
  );
}

export default App;