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
      pageSelected: 0,
      pages: [
      <AscendancyPage></AscendancyPage>,
      <TreePage></TreePage>,
      <ClusterPage></ClusterPage>,
      <GearPage></GearPage>,
      <GemPage></GemPage>
      ]
    }
   }

  changePage(pageNum){
     if (this.state.mainPage.pageSelected !== pageNum)
      this.setState({ mainPage: { ...this.state.mainPage, pageSelected: pageNum} });
   }
   
  render() {
      return ( 
        <section className="app">
          <div className='header'>
            <h1>Nuk's PoE Aura stats calculator</h1>
            <p>- Under Construction</p>
          </div>
            <NavBar changePage={this.changePage.bind(this)} />
          <div className="content">
            <MainPage content={this.state.mainPage} auras={this.state.auras} globalAuraEffect={this.state.globalAuraEffect} />
            <OutputBox auras={this.state.auras} globalAuraEffect={this.state.globalAuraEffect} />
          </div>
        </section>
    );
  }
}
 
export default App;