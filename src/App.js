import React, { Component } from 'react';
import MenuBar from './compos/MenuBar';
import MainPage from './compos/MainPage';
import OutputBox from './compos/OutputBox';
//import auras from './auraStats.js';
var auras = require('./auraStats').default;

class App extends Component {
  state = { 
    auras
   }

  render() {
    console.log(auras); 
    auras.ANGER.printEffect(100);
  
      return ( 
        <div className="App">
          <MenuBar />
          <MainPage auras={this.state.auras}/>
          <OutputBox auras={this.state.auras}/>
        </div>
    );
  }
}
 
export default App;