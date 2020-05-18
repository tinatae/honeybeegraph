import {
  RECEIVE_ALL_STATES,
} from "../actions/state_actions";

const StatesReducer = (
  state = { all: {}, user: {}, single: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_ALL_STATES:
      newState.all = action.states.data;
      return newState;  
    default:
      return state;
  }
};

export default StatesReducer;
