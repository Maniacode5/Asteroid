import React, { Component } from 'react';

import Vaisseau from './Vaisseau.jsx';
import Asteroid from './Asteroid.jsx';

class App extends Component {
   render() {
       return (
           <section>
               <h1>ASTEROID</h1>
               <svg id="Map" className="Map">
                   <Asteroid/>
                   <Asteroid/>
                   <Asteroid/>
                   <Asteroid/>
                   <Vaisseau className="" move="z" turnLeft="q" turnRight="d" />
               </svg>
           </section>
       );
   }
}

export default App;
