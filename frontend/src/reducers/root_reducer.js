import { combineReducers } from "redux";

import states from "./states_reducer";


const RootReducer = combineReducers({
  states
});

export default RootReducer;
