import React, { Component } from 'react';

import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import { getRandomColor } from './util.js';

class App extends Component {
  state = {
    shooting: false,
    bullets: []
  };

  componentWillMount() {
    console.log(this.state);
    window.addEventListener("keydown", (e) => {
      var newState = {};

      switch (e.keyCode) {
        case 32:
          if (this.state.bullets.length < 4) {
            newState.shooting = true;
          }
          break;
        default:
          break;
      }

      this.setState(newState);
    }, false);

    window.addEventListener("keyup", (e) => {
      var newState = {};

      switch (e.keyCode) {
        case 32:
          newState.shooting = false;
          break;
        default:
          break;
      }

      this.setState(newState);
    }, false);
  }

  render() {
    return (
      <section>
        <h1>ASTEROID</h1>
        <svg id="Map" className="Map">$
          <Asteroid />
          <Asteroid />
          <Asteroid />
          <Vaisseau className="" move={40} turnLeft={37} turnRight={39} shoot={32} color={getRandomColor()} />
          <ul>
            {
              this.state.bullets.map(() => {

                return ;
              })
            }
          </ul>
        </svg>
      </section>
    );
  }
}

export default App;
