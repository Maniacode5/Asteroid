import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { getRandomColor } from './util';

const colors = [
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
];

class ChooseColor extends Component {
    state = {
        colToChange: true
    }

    render() {
        const { color1, color2, changeColor } = this.props;
        const { colToChange } = this.state;

        var plChanging;

        if (colToChange) {
          plChanging = 'Player 1';
        } else {
          plChanging = 'Player 2';
        }

        return (
            <section id="choose-color">
                <h1>CHOOSE COLOR</h1>
                <div className="start-button-wrapper">
                  <Link className="start-button" to="/Game">Start Game</Link>
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
                            var pres;

                            if (colToChange) {
                              if (random) {
                                changeCol1 = getRandomColor();
                              } else {
                                pres = (
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
                                pres = (
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
                                  this.setState({ colToChange: !colToChange }, () => changeColor(1, changeCol1));
                                }

                                if (changeCol2) {
                                  this.setState({ colToChange: !colToChange }, () => changeColor(2, changeCol2));
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

export default ChooseColor;
