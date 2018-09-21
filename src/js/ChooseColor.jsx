import React, { Component } from 'react';

class ChooseColor extends Component {
    state= {
        displayed: 'color chooser'
    }

    render() {
        const { displayed } = this.state;
        const colors = [
            {
                colId: '#ffffff',
                colName: 'white'
            },
            {
                colId: '#ff0022',
                colName: 'red'
            },
            {
                colId: '#0009c5',
                colName: 'blue'
            },
            {
                colId: '#06c504',
                colName: 'green'
            },
            {
                colId: '#8e048e',
                colName: 'purple'
            }
        ];

        return (
            <section id="choose-color">
                <h1>CHOOSE COLOR</h1>
                <ul id="color-chooser">
                    {
                        colors.map(({ colId, colName }) => {
                            console.log(colId);
                            return (
                              <li>
                                  <p>{colName}</p>
                                  <svg>
                                      <path fill={colId} d="M 30,10 L 5,0 L 10,7.5 L 0,10 L 10,12.5 L 5,20 Z" />
                                  </svg>
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
