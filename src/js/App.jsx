import React, { Component } from 'react';

import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

import {getRandomColor} from './util';

function getAngle(){
    var DEFAULT_ANGLE = Math.random() * 360;
    return DEFAULT_ANGLE;
}

function asteroid() {
    var asteroids = [];
    for (var i = 0; i < Math.random() * 150; i++) {
        asteroids.push(<Asteroid/>)
    }
    return asteroids;
}

function spaceShip() {
    var ships = [];
    for (var i = 0; i < 1; i++) {
        ships.push(<Vaisseau move="" turnLeft="q" turnRight="d" angle={getAngle()}/>)
    }
    return ships;
}

class App extends Component {
    render() {
        {/*const color = getRandomColor();*/}
        return (
            <section>
                <h1>ESQUIVE</h1>
                <svg id="Map" className="Map">
                    {asteroid()}
                    {spaceShip()}
                    <Vaisseau move="" turnLeft="k" turnRight="m" color={"red"} angle={getAngle()}/>
                </svg>
            </section>
        );
    }
}

export default App;
