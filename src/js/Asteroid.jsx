import React, { Component } from 'react';

import flatten from "lodash/flatten";
import Vector from "./Vector";
import { positionLoop } from "./util";
//import Collision from './Collision';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
class Asteroid extends Component {
    state =  {
        trajectoire: undefined,
        position: undefined,
        astFillColor: 'transparent',
        astStrokeColor: 'white'
    }

    generateAsteroid(coef) {
        const points = [
            [coef*20, 0],
            [coef*40, 0],
            [coef*60, coef*20],
            [coef*60, coef*40],
            [coef*40, coef*60],
            [coef*20, coef*60],
            [0, coef*40],
            [0, coef*20]
        ];

        const r = coef*4;

        const coord = flatten(points.map((p, i, arr) => {
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

        return `M ${coord.map((p) => p.join(',')).join(" L ")} Z`;
    }

    checkCollision() {
      var vaisseau = document.getElementById('vaisseau').getBoundingClientRect();
      var asteroid = this._element.getBoundingClientRect();

      if (!(vaisseau.top > asteroid.bottom || vaisseau.bottom < asteroid.top || vaisseau.left > asteroid.right || vaisseau.right < asteroid.left)) {
        console.log('collide');
        // do something when collide
      }
    }

    timer () {
        setInterval(() => {
            const { trajectoire, position } = this.state;
            const boundingRect = this._element.getBoundingClientRect();
            const newState = {
                position : positionLoop("Map", Vector.add(position, trajectoire), boundingRect)
            };
            this.checkCollision()
            //Collision(this._element, document.getElementById("vaisseau"));
//console.log(position)
            this.setState(newState);
        }, 10);
    }

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                Math.random() * mapBounding.width,
                Math.random() * mapBounding.height
            ),
            trajectoire: new Vector((Math.random() + 1 ) * 2, Math.random() * 360)
        });

        this.timer();
    }

    componentWillMount() {
        this.setState({
            path: this.generateAsteroid(1),
        })
    }
    render() {
        const { path, position = { coordinates: { x: 0, y: 0 } } } = this.state;

        return (
            <path className="asteroid" ref={(r) => { this._element = r }} d={path} stroke={this.state.astStrokeColor} fill={this.state.astFillColor} transform={`translate(${position.coordinates.x} ${position.coordinates.y})`} />
        );
    }
}

export default Asteroid;
