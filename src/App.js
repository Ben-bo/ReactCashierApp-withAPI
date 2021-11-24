import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import { Navbarcomponent } from "./component";
import { Home, Success } from "./pages";

class App extends Component {
  render() {
    console.log("dari app", this.props.history);
    return (
      <BrowserRouter>
        <Navbarcomponent />
        <main>
          <Switch>
            {/* Switch bagian dari react dom versi 5*/}
            <Route path="/" component={Home} exact />
            <Route path="/success" component={Success} exact />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
