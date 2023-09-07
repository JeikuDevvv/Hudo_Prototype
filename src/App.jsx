/* eslint-disable no-unused-vars */
// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InOutForm from "./component/InOutForm";
import DataList from "./component/DataList";
import DisplayData from "./component/DisplayData";

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <Switch>
          <Route path="/" exact component={InOutForm} />
          <Route path="/data" exact component={DataList} />
          <Route path="/data/:folderName" component={DisplayData} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
