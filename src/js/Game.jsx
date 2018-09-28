import React, { Component } from 'react';

import CollisionProvider from "./CollisionProvider";
import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

function getAngle(angle){
    var DEFAULT_ANGLE = angle;
    return DEFAULT_ANGLE;
}

class Game extends Component {
    state = {
        firstFrame: null,
        frame: 0,
        nbAsteroids: 0
    }

    componentDidMount() {
      this.timer();
      setInterval(() => {
        const { nbAsteroids } = this.state;

          this.setState({ nbAsteroids : nbAsteroids + 1 })
      }, 2000)
    }

    stopInterval() {
      if (this.state.nbAsteroids !== 0) {
        this.setState({ nbAsteroids : 0 });
      }
    }

    render() {
        const { color1, color2 } = this.props;
        const { frame, nbAsteroids } = this.state;

        return (
          <div id="chiant">
              <section id="game">
                  <h1>DODGE</h1>
                  <svg id="Map" className="Map">
                      <CollisionProvider frame={frame} allowedCollision={[[Asteroid, Vaisseau]]}>
                          {
                              (new Array(nbAsteroids)).fill(<Asteroid frame={frame}/>)
                          }
                          <Vaisseau frame={frame} id="vaisseau" turnLeft={37} turnRight={39} color={color1} angle={getAngle(Math.random() * 360)} onCollision={this.endGame}/>
                          <Vaisseau frame={frame} id="vaisseau1" turnLeft={81} turnRight={68} color={color2} angle={getAngle(Math.random() * 360)} onCollision={this.endGame}/>
                      </CollisionProvider>
                  </svg>
              </section>
          </div>
        );
    }

    endGame = () => {
        const { firstFrame, frame } = this.state;

        setTimeout(() => {
            alert("You lose, you survive " + Math.round((frame - firstFrame)/1000) + " second. You are bad !!!");
            window.location = '/';
        }, 1250)
    }

    timer = () => {
        const { firstFrame, frame } = this.state;

        requestAnimationFrame((time) => this.setState({
            frame: time,
            firstFrame: firstFrame || frame
        }, this.timer));
    }
}

export default Game;
