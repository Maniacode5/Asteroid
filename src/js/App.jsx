import React, { Component } from 'react';
import _ from 'lodash';

import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import { getRandomColor } from './util.js';

var vCol = '#ffffff';
var to_display = 'color choice';
var displayed;

function startGame() {
  console.log(to_display + ' was display');
  to_display = 'game';
  console.log(to_display + ' is now displayed');
}

function stopGame() {
  console.log(to_display + ' was displayed');
  to_display = 'color choice';
  console.log(to_display + ' is now diplayed')
}

function changevCol(newCol) {
  vCol = newCol;
  console.log('color changed to ' + newCol);
  return vCol;
}

class App extends Component {
  state = {
    isGameStarted: 'start'
  };

  componentWillMount() {
    var keys = [];

    window.addEventListener("keydown", (e) => {
      keys[e.keyCode] = true;

      if (keys[19] && keys[90]) {
        alert('yolo');
      }
    }, false);

    window.addEventListener("keyup", (e) => {
      keys[e.keyCode] = false;

    })
  }

  asteroid(v, vaisseau) {
    const plus = v / 2;
    const fois = v / (plus);
    const calcul = Math.random() + plus * fois;
    var asteroids = [];

    for (var i = 0; i < v; i++) {
      asteroids.push(<Asteroid vaisseau={vaisseau}/>)
    }

    console.log(asteroids.length);
    return asteroids;
  }

  startG(s) {
    if (s === 'start') {
      startGame();
      this.setState({ isGameStarted: 'stop' });
    } else if (s === 'stop') {
      stopGame();
      this.setState({ isGameStarted: 'start' })
    } else {
      alert('Source code failed please report the problem at _____________________________________________ asteroid.localhost3000@hotmail.com')
    }

    return;
  }

  render() {
    const vaisseau = (<Vaisseau className="" move={40} turnLeft={37} turnRight={39} shoot={32} color={vCol} />);

    const game = (
      <svg id="Map" className="Map">
        {
          this.asteroid(5, vaisseau)
        }
        { vaisseau }
      </svg>
    );

    switch (to_display) {
      case 'color choice':
        displayed = <ColorChoice />;
        break;

      case 'game':
        displayed = game;

      default:
        break;
    }

    var startOrStop;

    if (this.state.isGameStarted === 'start') {
      startOrStop = 'block'; // change to 'Start Game' to get the stop game problem and ask to Jeremy
      console.log(startOrStop + ' debug App line 102');
    } else {
      startOrStop = 'none'; // change to 'Stop Game' to get the stop game problem and ask to Jeremy
      console.log(startOrStop + ' debug startOrStop = ' + startOrStop + ' & state isGameStarted = ' + this.state.isGameStarted);
    }

    return (
      <section>
        <h1>ASTEROID</h1>
        <div id="start-stop-button">
{
  // on the <p /> down there remove the style prop and change content to {startOrStop} to get the stop game problem and ask to Jeremy
}
          <p style={{ display: startOrStop }} onClick={() => this.startG(this.state.isGameStarted)}>Game Start</p>
        </div>
        { displayed }
      </section>
    );
  }
}

class ColorChoice extends Component {
  state = {
    debug: true
  };

  render() {
    console.log('yousk colChoice')

    const colors = [
      {
        colName: 'White',
        colID: '#ffffff',
        text: null
      },
      {
        colName: 'Blue',
        colID: '#0015c4',
        text: null
      },
      {
        colName: 'Green',
        colID: '#5cc83b',
        text: null
      },
      {
        colName: 'Purple',
        colID: '#8c2094',
        text: null
      },
      {
        colName: 'Red',
        colID: '#eb3323',
        text: null
      },
      {
        colName: 'Random color',
        colID: getRandomColor(),
        text: ('Be aware this can also be a color that you will not be able to see on the screen, if it is so just refresh the page or press ALT + F to end the game')
      }
    ];

    return (
      <div id="color-choice">
        <h2>Chose your color :</h2>
        <p>At the base it's white</p>
        <ul>
          {
            colors.map(({ colName, colID, text }) => {
              var desc = null;
              var colPres = (
                <svg>
                  <path className="color-pres" stroke={ colID } d='M 0, 10 L 30, 20 L 20, 12 L 30, 10 L 20, 8 L 30, 0 Z' />
                </svg>
              );
              var click = () => changevCol(colID);

              if (text) {
                desc = (<p className="text">{ text }</p>);
                colPres = null;
                click = () => changevCol(getRandomColor());
              }

              return (
                <li>
                  <p className="choose" onClick={ click }>{ colName }</p>
                  { colPres }
                  { desc }
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
