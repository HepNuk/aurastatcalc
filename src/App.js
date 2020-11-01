import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from './compos/NavBar';
import OutputBox from './compos/OutputBox';
import AscendancyPage from './compos/pages/AscendancyPage';
import TreePage from './compos/pages/TreePage';
import ClusterPage from './compos/pages/ClusterPage';
import GearPage from './compos/pages/GearPage';
import GemPage from './compos/pages/GemPage';

import './styles.css';
var auras = require('./auraStats').default;
var clusters = require('./clusterJewels').default;
var trees = require('./treePassives').default;

class App extends Component {
  state = {
    auras,
    clusters,
    trees,

    globalAuraEffect: 0,

    auraEffect: {
      asc: {
        selected: 0,
        options: [0,10,5],
        total: function(){ return this.options[this.selected] }

      },
      tree: {
        amount: 0,
        total: function(){return this.amount}
      },
      cluster: {
        amount: 0,
      },
      gear: {
        amount: 0,
        total: function(){return this.amount}
      },
      total: function(){
        return this.asc.total() + this.tree.total() + this.cluster.amount + this.gear.total();
      }
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

   changeSpecificAuraEffect(newSpecificEffect, auraKey){
    if(this.findAuraIndex(auraKey) !== null){
      let auraIndex = this.findAuraIndex(auraKey);

      let newAuraState = [...this.state.auras];
      newAuraState[auraIndex].specificAuraEffect = Number(newSpecificEffect);
      this.setState({ auras: newAuraState });
    }
   }

   changeGlobalAuraEffect(newAuraEffect, page){

    this.setState({auraEffect: {...this.state.auraEffect, [page]: {...this.state.auraEffect[page], amount: newAuraEffect}}});
   }

   changeClusterAmount(newAmount, clusterIndex){

    let newClusterStats = [...this.state.clusters];
    
    newClusterStats[clusterIndex].amount = Number(newAmount);
    this.setState({clusters: newClusterStats});
   }

   findAuraIndex(auraKey){
    let index = null;
    auras.forEach((aura) => {

      if(aura.key === auraKey){
        index = auras.indexOf(aura);
      }
    })
    return index;
   }
   
  render() {
    console.log(this.state.auras[7]);
      return ( 
        <section className="app">
          <div className='header'>
            <h1>Nuk's PoE Aura stats calculator</h1>
            <p>- Under Construction</p>
          </div>
          
          <Router>
            <NavBar />
          <div className="content">

                <div className='page main'>
                  <Switch>
                    <Route path='/aurastatcalc/' exact

                      render = {(props) => (
                        <AscendancyPage {...props} auras={auras} />
                      )}
                    />

                    <Route path='/aurastatcalc/tree'
                    
                      render = {(props) => (
                        <TreePage {...props} auras={auras} 
                          trees={trees}
                        />
                      )}
                    />

                   <Route path='/aurastatcalc/clusters'
                      
                      render = {(props) => (
                        <ClusterPage {...props} 

                          changeClusterAmount={this.changeClusterAmount.bind(this)}
                          changeGlobalAuraEffect={this.changeGlobalAuraEffect.bind(this)}
                          changeSpecificAuraEffect={this.changeSpecificAuraEffect.bind(this)}
                          clusters={clusters}
                         />
                      )}
                    />
                    
                    <Route path='/aurastatcalc/gear'
                      
                      render = {(props) => (
                        <GearPage {...props} auras={auras} />
                      )}
                    />

                    <Route path='/aurastatcalc/auras'
                      
                      render = {(props) => (
                        <GemPage {...props} 
                          changeGenoType={this.changeGenoType.bind(this)}
                          changeGenoLevel={this.changeGenoLevel.bind(this)}
                          changeAltQuality={this.changeAltQuality.bind(this)} 
                          changeQuality={this.changeQuality.bind(this)} 
                          changeLevel={this.changeLevel.bind(this)} 
                          auras={auras} 
                       />
                      )}
                    />
            
                  </Switch> 
                </div>
              
            <OutputBox clusters={this.state.clusters} auras={this.state.auras} globalAuraEffect={this.state.auraEffect.total()} />
          </div>
          </Router>
        </section>
    );
  }
}
 
export default App;

/*
<MainPage gemLinksPage={this.state.gemLinksPage} content={this.state.mainPage} auras={this.state.auras} globalAuraEffect={this.state.globalAuraEffect} />
*/

/*
<TreePage 
                    auras={auras}
                  />

                  <ClusterPage 
                    auras={auras} 
                  />

                  <GearPage 
                    auras={auras} 
                  />

                  <GemPage  
                    changeGenoType={this.changeGenoType.bind(this)}
                    changeGenoLevel={this.changeGenoLevel.bind(this)}
                    changeAltQuality={this.changeAltQuality.bind(this)} 
                    changeQuality={this.changeQuality.bind(this)} 
                    changeLevel={this.changeLevel.bind(this)} 
                    auras={auras} 
                  />
                  */