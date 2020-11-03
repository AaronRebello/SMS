import { STUDENT_ACTION_TYPES } from "./StudentAction";
import { DATA_STATE } from "../dataState";

const initialState = {
  student: null,
  error: null,
  dataState: DATA_STATE.NOT_INITIALIZED,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case STUDENT_ACTION_TYPES.FETCHING:
      return {
        ...state,
        dataState: DATA_STATE.FETCHING,
      };

    case STUDENT_ACTION_TYPES.STUDENT_FETCH_SUCCESS:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_SUCCESS,
        student: action.payload,
      };
    case STUDENT_ACTION_TYPES.STUDENT_FETCH_FAILED:
      return {
        ...state,
        dataState: DATA_STATE.FETCHED_FAILED,
        student: action.payload,
      };
    default:
      return state;
  }
}
