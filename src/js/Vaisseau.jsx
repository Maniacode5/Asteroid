import React, { Component } from 'react';

class Vaisseau extends Component {
  state = {
    mooving : null
  }
  componentWillMount() {
    document.addEventListener("keyDown", (event) =>{
      const { mooving } = this.state
      switch (event.key) {
        case this.props.upArrow:
        if mooving ===


      }
      console.log("fvzv")
    })
  }

  render() {
    return (
      <svg>
        <defs>
            <path id="vaisseau" d="M 10,0 L 0,20 L 8,15 L 10,25 L 12,15 L 20,20 Z" style={{"stroke": "white"}} />
        </defs>
        <use href="#vaisseau" x="50" y="50"/>
      </svg>
    );
  }
}

export default Vaisseau;
