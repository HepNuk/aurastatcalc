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
    globalAuraEffect: 100,

    mainPage: {
      pageSelected: 4,
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

  changeLevel(newLevel, auraKey){
    this.setState({ auras: { ...this.state.auras, [auraKey]: {...this.state.auras[auraKey], level: newLevel}} });
  }

  changeQuality(newQuality, auraKey){
    this.setState({ auras: { ...this.state.auras, [auraKey]: {...this.state.auras[auraKey], quality: newQuality}} });
  }

  changeAltQuality(newAltQuality, auraKey){
    this.setState({ auras: { ...this.state.auras, [auraKey]: {...this.state.auras[auraKey], altQuality: newAltQuality}} });
  }

  changeGenoLevel(newGenoLevel, auraKey){
    this.setState({ auras: { ...this.state.auras, [auraKey]: {...this.state.auras[auraKey], generosityLevel: newGenoLevel}} });
  }

  changeGenoType(newGenoType, auraKey){
    this.setState({ auras: { ...this.state.auras, [auraKey]: {...this.state.auras[auraKey], generosityType: newGenoType}} });
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