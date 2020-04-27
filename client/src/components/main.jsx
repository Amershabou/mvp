import React from "react";
import App from "./app.jsx";
import Login from "./login.jsx";
import Signup from "./signup.jsx";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

class Main extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/user/:id" component={App} />
          <Route path="*" component={Login} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Main;
