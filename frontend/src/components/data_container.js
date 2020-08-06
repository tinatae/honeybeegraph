import { connect } from "react-redux";
import React from 'react';
import { fetchAllStates } from "../actions/state_actions";
import Graph from './graph';


class Data extends React.Component {
  constructor(props) {
    super(props);

    this.dataSetCreator = this.dataSetCreator.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllStates();
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchAllStates !== prevProps.fetchAllStates) {
      window.location.reload();
    }
  }

  dataSetCreator(data) {
    let workingData;

    for (let state in data) {
      if (!data.hasOwnProperty(state)) {
        continue;
      }

     workingData = data.map(function (period) {
        return period["states"].map(function (eachState) {
          eachState.added_together = eachState.added + eachState.renovated;
          // eachState.net = eachState.added_together - eachState.lost;
          return eachState;
        });
      });
      return workingData;
    }
  
  };

  render() {
    
    if (this.props.allStates !== undefined && this.props.allStates.length > 0) {
  
      const cleanData = this.dataSetCreator(this.props.allStates);
      return (<Graph data={cleanData} />);
    } else {
      return <div>One minute while we load Bee Data </div>
    }
    
  }
}


const mSTP = (state) => {
  return {
    allStates: state.states.all,
  };
};

const mDTP = (dispatch) => {
  return {
    fetchAllStates: () => dispatch(fetchAllStates()),
  };
};

export default connect(mSTP, mDTP)(Data);
