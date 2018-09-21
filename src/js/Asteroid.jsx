import React, { Component } from 'react';

import flatten from "lodash/flatten";
import SAT from 'sat';


import Vector from "./Vector";
import { positionLoop, getRandomColor } from "./util";

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

    get SATElement () {
        const { position, coord } = this.state;

        return new SAT.Polygon(
            new SAT.Vector(position.coordinates.x, position.coordinates.y),
            coord.reverse().map(([x, y]) => new SAT.Vector(x, y))
        )
    }

    onCollision(element) {
        if (element instanceof Asteroid) {
            //console.log("Kaboom !!!!!")
        }
    }

    componentWillReceiveProps ({ frame }) {
        if (frame  !== this.props.frame) {
            const { trajectoire, position } = this.state;
            const boundingRect = this._element.getBoundingClientRect();
            const newState = {
                position : positionLoop("Map", Vector.add(position, trajectoire), boundingRect)
            };
            this.setState({ astStrokeColor: getRandomColor(), astFillColor: getRandomColor() })
            //this.checkCollision();
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

        return coord;
    }

/*
    checkCollision() {
        const { frame } = this.props;
        var asteroid = this._element.getBoundingClientRect();
        var vaisseau = document.getElementById('vaisseau').getBoundingClientRect();

        var asteroidSAT = new
        var vaisseauSAT = new SAT.Box(
            new SAT.Vector(vaisseau.x, vaisseau.y),
            vaisseau.width,
            vaisseau.height
        )

        if (!(vaisseau.top > asteroid.bottom || vaisseau.bottom < asteroid.top || vaisseau.left > asteroid.right || vaisseau.right < asteroid.left)) {
            alert('Player red lose, you survive ' + Math.round(frame / 1000) + ' seconds !!!') ? "" : window.location.reload();
        }

        var vaisseau1 = document.getElementById('vaisseau1').getBoundingClientRect();

        if (!(vaisseau1.top > asteroid.bottom || vaisseau1.bottom < asteroid.top || vaisseau1.left > asteroid.right || vaisseau1.right < asteroid.left)) {
            alert('Player blue lose, you survive ' + Math.round(frame / 1000) + ' seconds !!!') ? "" : window.location.reload();
        }
    }
*/

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                Math.random() * mapBounding.width,
                Math.random() * mapBounding.height
            ),
            trajectoire: new Vector((Math.random() + 1 ) * 2, Math.random() * 360)
        });
    }

    componentWillMount() {
        this.setState({
            coord: this.generateAsteroid(1),
        })
    }
    render() {
        const { coord, position = { coordinates: { x: 0, y: 0 } } } = this.state;

        return (
            <path
                ref={(r) => { this._element = r }}
                d={`M ${coord.map((p) => p.join(',')).join(" L ")} Z`}
                stroke="white"
                fill="transparent"
                transform={`translate(${position.coordinates.x} ${position.coordinates.y})`}
                />
        );
    }
}

export default Asteroid;
