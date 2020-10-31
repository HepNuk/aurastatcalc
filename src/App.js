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
    this.setState({ auras: { ...this.state.auras, [auraIndex]: {...this.state.auras[auraIndex], level: newLevel}} });
  }

  changeQuality(newQuality, auraIndex){
    this.setState({ auras: { ...this.state.auras, [auraIndex]: {...this.state.auras[auraIndex], quality: newQuality}} });
  }

  changeAltQuality(newAltQuality, auraIndex){
    this.setState({ auras: { ...this.state.auras, [auraIndex]: {...this.state.auras[auraIndex], altQuality: newAltQuality}} });
  }

  changeGenoLevel(newGenoLevel, auraIndex){
    this.setState({ auras: { ...this.state.auras, [auraIndex]: {...this.state.auras[auraIndex], generosityLevel: newGenoLevel}} });
  }

  changeGenoType(newGenoType, auraIndex){
    this.setState({ auras: { ...this.state.auras, [auraIndex]: {...this.state.auras[auraIndex], generosityType: newGenoType}} });
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