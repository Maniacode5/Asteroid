import React, { Component } from 'react';

import CollisionProvider from "./CollisionProvider";
import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import {/*getRandomColor*/} from './util';

function getAngle(){
    var DEFAULT_ANGLE = Math.random() * 360;
    return DEFAULT_ANGLE;
}



class Game extends Component {
    state= {
        frame: 0,
        nbAsteroids: 1
    }

    componentDidMount () {
        this.timer();
        setInterval(() => {
            const {nbAsteroids} = this.state;
            this.setState({nbAsteroids : nbAsteroids + 1})
        }, 5000)
    }

    render() {
        const { frame, nbAsteroids } = this.state;

        return (
            <section>
                <h1>DODGE</h1>
                <svg id="Map" className="Map">
                    <CollisionProvider frame={frame} allowedCollision={[[Asteroid, Vaisseau]]}>
                        {
                            (new Array(nbAsteroids)).fill(<Asteroid frame={frame}/>)
                        }
                        <Vaisseau frame={frame} id="vaisseau" turnLeft={37} turnRight={39} color={"red"} angle={getAngle()}/>
                        {/*<Vaisseau frame={frame} id="vaisseau1" turnLeft={81} turnRight={68} color={"blue"} angle={getAngle()}/>*/}
                    </CollisionProvider>
                </svg>
            </section>
        );
    }

    timer = () => {
        requestAnimationFrame((time) => this.setState({
            frame: time
        }, this.timer));
    }
}

export default Game;
