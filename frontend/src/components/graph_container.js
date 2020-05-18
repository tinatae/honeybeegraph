import { connect } from "react-redux";
import Graph from "./graph";
import {fetchAllStates} from "../actions/state_actions";


const mSTP = (state) => {
  return {
    allStates: state.states.all
  };
};

const mDTP = dispatch => {
  return {
    fetchAllStates: () => dispatch(fetchAllStates())
  };
};

export default connect(mSTP, mDTP)(Graph);
