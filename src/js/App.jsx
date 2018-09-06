import React, { Component } from 'react';

import flatten from "lodash/flatten";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class App extends Component {
    randomLines (points, r) {
        return flatten(points.map((p, i, arr) => {
            var next = arr[i+1];

            if (!next) {
                next = arr[0];
            }

            var nbSegments = getRandomInt(3, 4);
            var segmentX = (next[0] - p[0]) / nbSegments;
            var segmentY = (next[1] - p[1]) / nbSegments;
            var newPoints = []

            for (var j = 0; j <= nbSegments; j++) {
                var coord = [
                    getRandomInt((p[0] + (segmentX * j)) - r, (p[0] + (segmentX * j)) + r),
                    getRandomInt((p[1] + (segmentY * j)) - r, (p[1] + (segmentY * j)) + r),
                ]
                newPoints.push(coord);
            }

            return newPoints;
        }))
    }

    generateAsteroid() {
        var points = [
            [20, 0],
            [40, 0],
            [60, 20],
            [60, 40],
            [40, 60],
            [20, 60],
            [0, 40],
            [0, 20]
        ]
        return <path d={`M ${this.randomLines(points, 5).map((p) => p.join(',')).join(" L ")} Z `} style={{"stroke": "white"}}/>
    }

    render() {
        return (
            <section>
                <h1>ASTEROID</h1>
                <svg className="Map">
                    <defs>
                        <path id="vaisseau" d="M 10,0 L 0,20 L 8,15 L 10,25 L 12,15 L 20,20 Z" style={{"stroke": "white"}} />
                    </defs>
                    {this.generateAsteroid()}
                    <use href="#vaisseau" x="50" y="50"/>
                </svg>
            </section>
        );
    }
}

export default App;
