import React, { Component } from 'react';

import flatten from "lodash/flatten";
import Vector from "./Vector";
import {positionLoop, getRandomColor} from "./util";

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
class Asteroid extends Component {
    state =  {
        trajectoire: undefined,
        position: undefined,
        astFillColor: "transparent",
        astStrokeColor: "white"
    }

    componentWillReceiveProps ({ frame }) {
        if (frame  !== this.props.frame) {
            const { trajectoire, position } = this.state;
            const boundingRect = this._element.getBoundingClientRect();
            const newState = {
                position : positionLoop("Map", Vector.add(position, trajectoire), boundingRect)
            };
            this.setState({ astStrokeColor: getRandomColor(), astFillColor: getRandomColor() })
            this.checkCollision();
            this.setState(newState);
        }
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
        const { frame } = this.props;
        var asteroid = this._element.getBoundingClientRect();
        var vaisseau = document.getElementById('vaisseau').getBoundingClientRect();

        if (!(vaisseau.top > asteroid.bottom || vaisseau.bottom < asteroid.top || vaisseau.left > asteroid.right || vaisseau.right < asteroid.left)) {
            alert('Player red lose, you survive ' + Math.round(frame / 1000) + ' seconds !!!') ? "" : window.location.reload();
        }

        var vaisseau1 = document.getElementById('vaisseau1').getBoundingClientRect();

        if (!(vaisseau1.top > asteroid.bottom || vaisseau1.bottom < asteroid.top || vaisseau1.left > asteroid.right || vaisseau1.right < asteroid.left)) {
            alert('Player blue lose, you survive ' + Math.round(frame / 1000) + ' seconds !!!') ? "" : window.location.reload();
        }
    }

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                mapBounding.left + Math.random() * mapBounding.width,
                mapBounding.top + Math.random() * mapBounding.height
            ),
            trajectoire: new Vector((Math.random() + 1 ) * 3, Math.random() * 360)
        });
    }

    componentWillMount() {
        this.setState({
            path: this.generateAsteroid(1),
        })
    }
    render() {
        const { path, position = { coordinates: { x: 0, y: 0 } } } = this.state;

        return (
            <path
                ref={(r) => { this._element = r }}
                d={path}
                stroke={this.state.astStrokeColor}
                fill={this.state.astFillColor}
                transform={`translate(${position.coordinates.x} ${position.coordinates.y})`}
                />
        );
    }
}

export default Asteroid;
