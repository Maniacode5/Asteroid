import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import ChooseColor from './ChooseColor';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" component={ChooseColor} />
        </Switch>
      </div>
    );
  }
}

export default App;
