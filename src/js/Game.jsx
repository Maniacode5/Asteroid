import React, { Component } from 'react';

import CollisionProvider from "./CollisionProvider";
import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import { getRandomColor } from './util';

var couleurVaisseau1 = '#00ffff';
var couleurVaisseau2 = '#fff000';
var gameStart = false;
var positionAbs = 'relative';

function startG(color1, color2) {
  couleurVaisseau1 = color1;
  couleurVaisseau2 = color2;
  gameStart = !gameStart;
  if (positionAbs === 'relative') {
    positionAbs = 'absolute';
  } else {
    positionAbs = 'relative';
  }
}

function getAngle(angle){
    var DEFAULT_ANGLE = angle;
    return DEFAULT_ANGLE;
}

var interval = null;

class Game extends Component {
    state = {
        frame: 0,
        nbAsteroids: 0
    }

    componentDidMount() {
      this.timer();
    }

    startInterval() {
      interval = setInterval(() => {
          const {nbAsteroids} = this.state;
          this.setState({ nbAsteroids : nbAsteroids + 1 })
      }, 5000)
    }

    stopInterval() {
      clearInterval(interval)
      interval = null;
      if (this.state.nbAsteroids !== 0) {
        this.setState({ nbAsteroids : 0 });
      }
    }

    render() {
        const { frame, nbAsteroids } = this.state;
        var displayed = null;

        if (gameStart) {
          this.startInterval()

          displayed = (
              <section id="game">
                  <h1>DODGE</h1>
                  <div className="start-button-wrapper">
                    <p style={{ position: positionAbs }} className={"start-button " + positionAbs} onClick={() => startG('#ffffff')}>Stop Game</p>
                  </div>
                  <svg id="Map" className="Map">
                      <CollisionProvider frame={frame} allowedCollision={[[Asteroid, Vaisseau]]}>
                          {
                              (new Array(nbAsteroids)).fill(<Asteroid frame={frame}/>)
                          }
                          <Vaisseau frame={frame} id="vaisseau" turnLeft={37} turnRight={39} color={couleurVaisseau1} angle={getAngle(Math.random() * 360)}/>
                          <Vaisseau frame={frame} id="vaisseau1" turnLeft={81} turnRight={68} color={couleurVaisseau2} angle={getAngle(Math.random() * 360)}/>
                      </CollisionProvider>
                  </svg>
              </section>
          );
        } else {
          this.stopInterval();
          displayed = (<ChooseColor />);
        }

        return (
          <div id="chiant">
            { displayed }
          </div>
        );
    }

    timer = () => {
        requestAnimationFrame((time) => this.setState({
            frame: time
        }, this.timer));
    }
}

class ChooseColor extends Component {
    state = {
        displayed: 'color chooser',
        color1: '#fff000',
        color2: '#00ffff',
        colors: [
            {
                colId: '#ffffff',
                colName: 'White'
            },
            {
                colId: '#ff0022',
                colName: 'Red'
            },
            {
                colId: '#0009c5',
                colName: 'Blue'
            },
            {
                colId: '#06c504',
                colName: 'Green'
            },
            {
                colId: '#8e048e',
                colName: 'Purple'
            },
            {
                colId: null,
                colName: 'Random Color',
                random: true
            }
        ],
        colToChange: true
    }

    render() {
        const { displayed, color1, color2, colors, colToChange } = this.state;

        var plChanging;

        if (colToChange) {
          plChanging = 'Player1';
        } else {
          plChanging = 'Player2';
        }

        return (
            <section id="choose-color">
                <h1>CHOOSE COLOR</h1>
                <div className="start-button-wrapper">
                  <p className="start-button" onClick={() => startG(color1, color2)}>Start Game</p>
                </div>
                <h2>Choose your ship color :</h2>
                <p className="is-choosing">{ plChanging } is choosing...</p>
                <div className="pres-div">
                  <div className="pres-pl">
                    <p>Player1</p>
                    <svg className="pres-svg">
                        <path fill={ color1 } d="M 10,0 L 0,25 L 7.5,20 L 10,30 L 12.5,20 L 20,25 Z" />
                    </svg>
                    <p className="commands">drive with Q & D</p>
                  </div>
                  <div className="pres-pl">
                    <p>Player2</p>
                    <svg className="pres-svg">
                        <path fill={ color2 } d="M 10,0 L 0,25 L 7.5,20 L 10,30 L 12.5,20 L 20,25 Z" />
                    </svg>
                    <p className="commands">drive with arrow keys</p>
                  </div>
                </div>
                <ul>
                    {
                        colors.map(({ colId, colName, random }) => {
                            var changeCol1;
                            var changeCol2;

                            if (colToChange) {
                              if (random) {
                                changeCol1 = getRandomColor();
                              } else {
                                var pres = (
                                  <svg>
                                      <path fill={ colId } d="M 0,10 L 25,0 L 20,7.5 L 30,10 L 20,12.5 L 25,20 Z" />
                                  </svg>
                                );
                                changeCol1 = colId;
                              }
                            } else {
                              if (random) {
                                changeCol2 = getRandomColor();
                              } else {
                                var pres = (
                                  <svg>
                                      <path fill={ colId } d="M 0,10 L 25,0 L 20,7.5 L 30,10 L 20,12.5 L 25,20 Z" />
                                  </svg>
                                );
                                changeCol2 = colId;
                              }
                            }

                            return (
                              <li onClick={() => {
                                if (changeCol1) {
                                  this.setState({ color1: changeCol1, colToChange: !colToChange })
                                }

                                if (changeCol2) {
                                  this.setState({ color2: changeCol2, colToChange: !colToChange })
                                }
                              }}>
                                  <p className="hover">{ colName }</p>
                                  { pres }
                              </li>
                            );
                        })
                    }
                </ul>
            </section>
        );
    }
}

export default Game;
