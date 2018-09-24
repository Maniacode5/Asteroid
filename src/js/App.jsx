import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

// import ChooseColor from './ChooseColor';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <div id="app">
        <Switch>
          <Route exact path="/" component={ Game } />
        </Switch>
      </div>
    );
  }
}

export default App;
