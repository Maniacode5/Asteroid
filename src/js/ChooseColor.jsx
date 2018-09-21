import React, { Component } from 'react';

import { getRandomColor } from './util';

class ChooseColor extends Component {
    state= {
        displayed: 'color chooser'
    }

    render() {
        const { displayed } = this.state;
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
                text: 'Be awared that the color that you will get might be a color that you will not be able to see correctly on screen, if it is so than just press the End Game button to go back to this page and choose another color'
            }
        ];

        return (
            <section id="choose-color">
                <h1>CHOOSE COLOR</h1>
                <h2>Choose your ship color :</h2>
                <ul>
                    {
                        colors.map(({ colId, colName, text }) => {
                            var p;

                            if (text) {
                              p = <p className="desc">{ text }</p>

                            } else {
                              p = (
                                <svg>
                                    <path fill={colId} d="M 30,10 L 5,0 L 10,7.5 L 0,10 L 10,12.5 L 5,20 Z" />
                                </svg>
                              );
                            }

                            return (
                              <li>
                                  <p>{colName}</p>
                                  { p }
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
