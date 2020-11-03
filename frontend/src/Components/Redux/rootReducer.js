import { combineReducers } from "redux";
import authReducer from "./Authentication/AuthReducer";
import ResourceReducer from "./Resources/ResourceReducer";
import StudentReducer from "./Students/StudentReducer";

export default combineReducers({
  auth: authReducer,
  resource: ResourceReducer,
  student: StudentReducer,
});
