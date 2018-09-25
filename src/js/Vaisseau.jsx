import React, { Component } from 'react';

import cx from "classnames";
import SAT from 'sat';

import Vector from "./Vector";
import {positionLoop, getRandomColor} from "./util";
import Asteroid from "./Asteroid";

import * as Explosion from "../image/sprite-explosion-vaisseau"

const DEFAULT_ROTATION = 4;
const DEFAULT_SPEED = 5;
const DEFAULT_ANGLE = Math.random() * 360;

class Vaisseau extends Component {
    state = {
        trajectoire: undefined,
        position: undefined,
        mooving: true,
        turning: false,
        spaceFillColor: "transparent",
        spaceStrokeColor: "white",
        coord: [
            [25,10],
            [0,0],
            [5,7.5],
            [-5,10],
            [5,12.5],
            [0,20]
        ],
        boom: false,
        explosionState: 0
    };

    get SATElement () {
        const { position, coord } = this.state;

        return new SAT.Polygon(
            new SAT.Vector(position.coordinates.x, position.coordinates.y),
            coord.map(([x, y]) => new SAT.Vector(x, y))
        )
    }

    onCollision(element) {
        const { boom } = this.state;
        if (element instanceof Asteroid) {
            if (!!boom)
                return;
                
            this.setState({
                boom: true,
                explosionState: 0,
                mooving: false,
                turning: false
            })
        }
    }

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                (mapBounding.width / 2),
                (mapBounding.height / 2)
            ),
            trajectoire: new Vector(DEFAULT_SPEED, DEFAULT_ANGLE)
        });

        window.addEventListener('keydown', (e) => {
            const newState = {};
            const { boom } = this.state;

            if (boom)
                return;

            switch (e.keyCode){

                case this.props.move:
                    newState.mooving = false;
                    break;

                case this.props.turnLeft:
                    newState.turning = "left";
                    break;

                case this.props.turnRight:
                    newState.turning = "right";
                    break;

                default:
                    break;
            }

            this.setState(newState);
        });

        window.addEventListener('keyup', (e) => {
            const { turning, boom } = this.state;
            const newState = {};

            if (boom)
                return;

            switch (e.keyCode){

                case this.props.move:
                    newState.mooving = true;
                    break;

                case this.props.turnLeft:
                    if (turning === "left") {
                        newState.turning = false;
                    }
                    break;

                case this.props.turnRight:
                    if (turning === "right") {
                        newState.turning = false;
                    }
                    break;

                default:
                    break;
            }

            this.setState(newState);
        });

        window.addEventListener('keyup', (e) => {
            let { turning } = this.state;
            const newState = {};

            switch (e.keyCode){

                case this.props.move:
                    newState.mooving = true;
                    break;

                case this.props.turnLeft:
                    if (turning === "left") {
                        newState.turning = false;
                    }
                    break;

                case this.props.turnRight:
                    if (turning === "right") {
                        newState.turning = false;
                    }
                    break;

                default:
                    break;
            }

            this.setState(newState);
        });
    }

    componentWillReceiveProps ({ frame, boom }) {
        const newState = {};

        if (frame !== this.props.frame){
            const { trajectoire, position, mooving, turning } = this.state;

            if (mooving) {
                newState.position = positionLoop("Map", Vector.add(position, trajectoire), this._element.getBoundingClientRect());
            }

            if (turning) {
                newState.trajectoire = new Vector(trajectoire.length, trajectoire.angle);

                switch (turning) {
                    case "left":
                        newState.trajectoire = trajectoire.rotate(-DEFAULT_ROTATION);
                        break;

                    case "right":
                        newState.trajectoire = trajectoire.rotate(DEFAULT_ROTATION);
                        break;

                    default:
                        break;
                }
            }

            if (boom && ! this.props.boom) {
                newState.explosionState = 0;
            }

            this.setState({ spaceStrokeColor: getRandomColor(), spaceFillColor: getRandomColor() })
            this.setState(newState);
        }
    }

    componentDidUpdate () {
        const { boom, explosionState } = this.state;

        if (boom && (explosionState < Object.values(Explosion).length)) {
            setTimeout(() => this.setState({ explosionState: explosionState+1 }), 75);
        }
    }

    render() {
        const { position = { coordinates: { x: 0, y: 0 } }, trajectoire = {}, boom, explosionState } = this.state;
        return (
            <g
                ref={(r) => { this._element = r; }}
                transform={`rotate(${trajectoire.angle} ${position.coordinates.x + 10} ${position.coordinates.y+12.5})
                translate(${position.coordinates.x} ${position.coordinates.y})`}
                className={cx("vaisseau", this.props.className)}
                id={this.props.id}>
                {
                    !boom ? (
                        <path
                            d="M 25,10 L 0,0 L 5,7.5 L -5,10 L 5,12.5 L 0,20 Z"
                            /*fill={this.state.spaceFillColor}*/
                            /*stroke={this.state.spaceStrokeColor}*/
                            fill={this.props.color}
                            />
                    ) : (
                        <image href={Object.values(Explosion)[explosionState]} x="-10" y="-12" height="50px" width="50px" />
                    )
                }
            </g>
        );
    }
}

export default Vaisseau;
