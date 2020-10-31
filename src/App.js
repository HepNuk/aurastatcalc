import React, { Component } from 'react';
import NavBar from './compos/NavBar';
import MainPage from './compos/MainPage';
import OutputBox from './compos/OutputBox';
import AscendancyPage from './compos/pages/AscendancyPage';
import TreePage from './compos/pages/TreePage';
import ClusterPage from './compos/pages/ClusterPage';
import GearPage from './compos/pages/GearPage';
import GemPage from './compos/pages/GemPage';

import './styles.css';
var auras = require('./auraStats').default;

class App extends Component {
  state = {
    auras,

    ascendancy: 0,

    globalAuraEffect: 100,

    mainPage: {
      pageSelected: 0,
      pages: [
      <AscendancyPage auras={auras}/>,
      
      <TreePage auras={auras}/>,

      <ClusterPage auras={auras}/>,

      <GearPage auras={auras}/>,

      <GemPage  changeGenoType={this.changeGenoType.bind(this)}
                changeGenoLevel={this.changeGenoLevel.bind(this)}
                changeAltQuality={this.changeAltQuality.bind(this)} 
                changeQuality={this.changeQuality.bind(this)} 
                changeLevel={this.changeLevel.bind(this)} 
                auras={auras}/>,
      ]
    }
  }

  changeLevel(newLevel, auraIndex){

    let newAuraState = [...this.state.auras];
    newAuraState[auraIndex].level = Number(newLevel);
    this.setState({ auras: newAuraState });

  }

  changeQuality(newQuality, auraIndex){
    let newAuraState = [...this.state.auras];
    newAuraState[auraIndex].quality = Number(newQuality);
    this.setState({ auras: newAuraState });
  }

  changeAltQuality(newAltQuality, auraIndex){

    let newAuraState = [...this.state.auras];
    newAuraState[auraIndex].altQuality = Number(newAltQuality);
    this.setState({ auras: newAuraState });
  }

  changeGenoLevel(newGenoLevel, auraIndex){

    let newAuraState = [...this.state.auras];
    newAuraState[auraIndex].generosityLevel = Number(newGenoLevel);
    this.setState({ auras: newAuraState });
  }

  changeGenoType(newGenoType, auraIndex){

    let newAuraState = [...this.state.auras];
    newAuraState[auraIndex].generosityType = Number(newGenoType);
    this.setState({ auras: newAuraState });
  }

  changePage(pageNum){
     if (this.state.mainPage.pageSelected !== pageNum)
      this.setState({ mainPage: { ...this.state.mainPage, pageSelected: pageNum} });
   }
   
  render() {
      console.log(this.state.auras);
      return ( 
        <section className="app">
          <div className='header'>
            <h1>Nuk's PoE Aura stats calculator</h1>
            <p>- Under Construction</p>
          </div>
            <NavBar changePage={this.changePage.bind(this)} />
          <div className="content">
            <MainPage gemLinksPage={this.state.gemLinksPage} content={this.state.mainPage} auras={this.state.auras} globalAuraEffect={this.state.globalAuraEffect} />
            <OutputBox auras={this.state.auras} globalAuraEffect={this.state.globalAuraEffect} />
          </div>
        </section>
    );
  }
}
 
export default App;