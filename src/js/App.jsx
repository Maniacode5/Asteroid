import React, { Component } from 'react';

import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import { getRandomColor } from './util.js';

class App extends Component {
  state = {
    shooting: false
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

  asteroid(v) {
    var plus = v / 2;
    var fois = v / (plus);
    var asteroids = [];

    const vaisseau = (<Vaisseau className="" turnLeft={37} turnRight={39} shoot={32} color={getRandomColor()} />);

    for (var i = 0; i < Math.random() + plus * fois; i++) {
      asteroids.push(<Asteroid vaisseau={vaisseau}/>)
    }
    return asteroids;
  }

  render() {
    return (
      <section>
        <h1>ASTEROID</h1>
        <svg id="Map" className="Map">
          {
            this.asteroid(10)
          }
          <Vaisseau className="" turnLeft={37} turnRight={39} shoot={32} color={getRandomColor()} />
        </svg>
      </section>
    );
  }
}

export default App;
