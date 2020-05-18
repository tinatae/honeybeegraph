import {
  getAllStates,
} from "../util/state_api_util";

export const RECEIVE_ALL_STATES = "RECEIVE_ALL_STATES";


export const receiveAllStates = (states) => ({
  type: RECEIVE_ALL_STATES,
  states
});

export const fetchAllStates = () => (dispatch) =>
  getAllStates()
    .then((states) => dispatch(receiveAllStates(states)))
    .catch((err) => console.log(err));
