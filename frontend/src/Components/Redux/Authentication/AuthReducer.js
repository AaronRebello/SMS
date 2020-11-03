import { AUTH_ACTIION_TYPES } from "./AuthAction";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTIION_TYPES.ON_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
