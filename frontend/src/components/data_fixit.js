import { connect } from "react-redux";
import React from 'react';
import { fetchAllStates } from "../actions/state_actions";
import GraphContainer from './graph_container';

const dateTable = {
  "1": "1/1/15 - 3/31/15",
  "2": "4/1/15 - 6/30/15",
  "3": "7/1/15 - 9/30/15",
  "4": "10/1/15 - 12/31/15",
  "5": "1/1/16 - 3/31/16",
  "6": "4/1/16 - 6/30/16",
  "7": "7/1/16 - 9/30/16",
  "8": "10/1/16 - 12/31/16",
  "9": "1/1/17 - 3/31/17",
  "10": "4/1/17 - 6/30/17",
  "11": "7/1/17 - 9/30/17",
  "12": "10/1/17 - 12/31/17",
  "13": "1/1/18 - 3/31/18",
  "14": "4/1/18 - 6/30/18",
  "15": "7/1/18 - 9/30/18",
  "16": "10/1/18 - 12/31/18",
};


class FixedData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataLoaded: false,
        };
    }

    componentDidMount() {
        this.props.fetchAllStates()
        .then(() => this.setState({ dataLoaded: true }));
    }

    render() {
        var workingData;

        if (this.state.dataLoaded !== false) {
            workingData = this.props.allStates.map(function(period) {
            return period["states"]
          // .filter(function(eachEntry) {
          //   var hasIt = (eachEntry.state && eachEntry.total);
          //   return hasIt
          // })
          .map(function(eachState) {
                eachState.table = dateTable[eachState.table];
                eachState.state = eachState.state;
                eachState.total = +eachState.total;
                eachState.lost = +eachState.lost;
                eachState.percent_lost = +eachState.percent_lost;
                eachState.added = +eachState.added;
                eachState.renovated = +eachState.renovated;
                eachState.added_together = eachState.added + eachState.renovated;
              return eachState;
          })
        });

        return (
                <GraphContainer workingData={workingData}/>
            )
        } else { return <div>Oops Sorry Not Loaded Yet!</div> };
    }
};


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

export default connect(mSTP, mDTP)(FixedData);
