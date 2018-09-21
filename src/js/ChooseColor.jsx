import React, { Component } from 'react';

import { getRandomColor } from './util';

export var couleurVaisseau = '#ffffff';

function startG(color) {
  couleurVaisseau = color;
}

class ChooseColor extends Component {
    state = {
        displayed: 'color chooser',
        color: '#ffffff',
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
        ]
    }

    changeColor(newCol) {
      this.setState({ color: newCol })
    }

    render() {
        const { displayed, color, colors } = this.state;

        return (
            <section id="choose-color">
                <h1>CHOOSE COLOR</h1>
                <div className="start-button-wrapper">
                  <p className="start-button" onClick={() => startG(color)}><a href="/game">Start Game</a></p>
                </div>
                <h2>Choose your ship color (<span style={{ color: color }}>{color}</span>) :</h2>
                <ul>
                    {
                        colors.map(({ colId, colName, random }) => {
                            var colChange;

                            if (random) {
                              colChange = getRandomColor();
                            } else {
                              var pres = (
                                <svg>
                                    <path fill={ colId } d="M 0,10 L 25,0 L 20,7.5 L 30,10 L 20,12.5 L 25,20 Z" />
                                </svg>
                              );
                              colChange = colId;
                            }

                            return (
                              <li onClick={() => this.changeColor(colChange)}>
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
