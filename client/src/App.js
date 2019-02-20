import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Search from "./components/Search";
import CardDisplay from "./components/CardDisplay";

const App = () => {
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route path="/:card_id" component={CardDisplay} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
