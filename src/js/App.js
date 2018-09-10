import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div>
        <svg>
          <defs>
            <path id="vaisseau" d="M 10,0 L 0,25 L 10,18 L 20,25 Z" style={{"stroke": "black", "fill": "white"}} />
          </defs>
          <use href="#vaisseau" x="10" y="10" />
        </svg>
      </div>
    );
  }
}

export default App;
