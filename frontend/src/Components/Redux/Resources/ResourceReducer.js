import { RESOURCE_ACTION_TYPES } from "./ResourceAction";
import { DATA_STATE } from "../dataState";

const initialState = {
  resource: null,
  error: null,
  dataState: DATA_STATE.NOT_INITIALIZED,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RESOURCE_ACTION_TYPES.FETCHING:
      return {
        ...state,
        dataState: DATA_STATE.FETCHING,
      };
    case RESOURCE_ACTION_TYPES.RESOURCE_FETCH_SUCCESS:
      return {
        ...state,
        dataState: DATA_STATE.FETCH_SUCCESS,
        resource: action.payload,
      };
    case RESOURCE_ACTION_TYPES.RESOURCE_FETCH_FAILED:
      return {
        ...state,
        dataState: DATA_STATE.FETCHED_FAILED,
        resource: action.payload,
      };
    default:
      return state;
  }
}
