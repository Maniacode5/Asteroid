import React, { Component } from 'react';
import cx from "classnames";
import Vector from "./Vector";
import {positionLoop, getRandomColor} from "./util"

const DEFAULT_ROTATION = 5;
const DEFAULT_SPEED = 5;


class Vaisseau extends Component {
    state = {
        trajectoire: undefined,
        position: undefined,
        mooving: true,
        turning: false,
        spaceFillColor: "transparent",
        spaceStrokeColor: "white"
    };

    timer () {
        setInterval(() => {
            const { trajectoire, position, mooving, turning } = this.state;
            const newState = {};

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
                }
            }

            //this.setState({ spaceStrokeColor: getRandomColor(), spaceFillColor: getRandomColor() })
            this.setState(newState);
        }, 10);
    }

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                (mapBounding.width / 2),
                (mapBounding.height / 2)
            ),
            trajectoire: new Vector(DEFAULT_SPEED, this.props.angle)
        });

        document.addEventListener('keydown', (event) => {
            const newState = {};

            switch (event.key){
                case this.props.move:
                    newState.mooving = true;
                    break;

                case this.props.turnLeft:
                    newState.turning = "left";
                    break;

                case this.props.turnRight:
                    newState.turning = "right";
                    break;
            }

            this.setState(newState);
        });

        document.addEventListener('keyup', (event) => {
            let { turning } = this.state;
            const newState = {};

            switch (event.key){
                case this.props.move:
                    newState.mooving = false;
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
            }

            this.setState(newState);
        });

        this.timer();
    }

    render() {
        const { position = { coordinates: { x: 0, y: 0 } }, trajectoire = {} } = this.state;
        return (
            <path
                ref={(r) => { this._element = r; }}
                id="vaisseau"
                d="M 25,10 L 0,0 L 5,7.5 L -5,10 L 5,12.5 L 0,20 Z"
                href="#vaisseau"
                className={cx("vaisseau", this.props.className)}
                transform={`rotate(${trajectoire.angle} ${position.coordinates.x + 10} ${position.coordinates.y+12.5})
                translate(${position.coordinates.x} ${position.coordinates.y})`}
                fill={this.state.spaceFillColor}
                stroke={this.state.spaceStrokeColor}
                />
        );
    }
}

export default Vaisseau;
