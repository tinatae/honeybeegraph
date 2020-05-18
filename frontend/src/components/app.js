import React from "react";
import { Route } from "react-router-dom";

import GraphContainer from "./graph_container"; //

const App = () => (
  <div>
      <Route exact path="/" component={GraphContainer} />
  </div>
);

export default App;
