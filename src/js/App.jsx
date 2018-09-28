import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import ChooseColor from './ChooseColor';
import Game from './Game';

class App extends Component {
    state = {
        color1: '#fff000',
        color2: '#00ffff',
        gameStart: false,
        positionAbs: 'relative'
    }
  render() {
    const { color1, color2 } = this.state;

    return (
      <div id="app">
        <Switch>
          <Route exact path="/" render={() => (
              <ChooseColor color1={color1} color2={color2} changeColor={this.changeColor} />
          )} />
          <Route exact path="/Game" render={() => (
              <Game color1={color1} color2={color2} />
          )} />
        </Switch>
      </div>
    );
  }

  changeColor = (vaisseauIdx, color) => {
      this.setState({ [`color${vaisseauIdx}`]: color })
  }
}

export default App;
