import React, { Component, Fragment } from 'react';
import cx from "classnames";
import Vector from "./Vector";

class Vaisseau extends Component {
    state = {
        trajectoire: undefined,
        position: undefined,
        mooving: false,
        turning: false
    };

    timer () {
        setInterval(() => {
            const { trajectoire, position, mooving, turning } = this.state;
            const newState = {};

            if (mooving) {
                newState.position = Vector.add(position, trajectoire);
            }

            if (turning) {
                newState.trajectoire = new Vector(trajectoire.length, trajectoire.angle);

                switch (turning) {
                    case "left":
                        newState.trajectoire.rotate(-5);
                        break;
                    case "right":
                        newState.trajectoire.rotate(5);
                        break;
                }
            }

            this.setState(newState);
        }, 10);
    }

    componentDidMount() {
        const mapBounding = document.getElementById("Map").getBoundingClientRect();

        this.setState({
            position: Vector.fromCoordinates(
                mapBounding.left + (mapBounding.width / 2),
                mapBounding.top + (mapBounding.height / 2)
            ),
            trajectoire: new Vector(5, -90)
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
                    if (turning == "left") {
                        newState.turning = false;
                    }
                    break;

                case this.props.turnRight:
                    if (turning == "right") {
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
console.log(trajectoire.angle)
        return (
            <Fragment>
                <path id="vaisseau" d="M 25,10 L 0,0 L 5,10  L 0,20 Z"  href="#vaisseau" className={cx("vaisseau", this.props.className)} transform={`rotate(${trajectoire.angle} ${position.coordinates.x + 10} ${position.coordinates.y+12.5}) translate(${position.coordinates.x} ${position.coordinates.y})`} stroke="white" />
            </Fragment>
        );
    }
}

export default Vaisseau;
