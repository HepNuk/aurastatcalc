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
var aurasFromSkills = require('./aurasFromSkills').default;

class App extends Component {
  state = {
    auras,
    clusters,
    trees,
    aurasFromSkills,

    auraEffect: {
      asc: {
        selected: 0,
        options: [0,10,5],
        total: function(){ return this.options[this.selected] }

      },
      tree: {
        amount: 0,
        timeless: 0,
        total: function(){  return (Number(this.amount+this.timeless))}
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

  
  changeSpecificAuraEffectClusters(newSpecificEffect, auraKey){
    if(this.findAuraIndex(auraKey) !== null){
      let auraIndex = this.findAuraIndex(auraKey);

      let newAuraState = [...this.state.auras];
      newAuraState[auraIndex].specificAuraEffect = Number(newSpecificEffect);
      this.setState({ auras: newAuraState });
    }
   }

   changeSpecificAuraEffectGear(newSpecificEffect, auraKey){
    if(this.findAuraIndex(auraKey) !== null){
      let auraIndex = this.findAuraIndex(auraKey);

      let newAuraState = [...this.state.auras];
      newAuraState[auraIndex].specificAuraEffect = Number(newSpecificEffect);
      this.setState({ auras: newAuraState });
    }
   }

   changeSpecificAuraEffectTotal(newSpecificEffect, auraKey){
    if(this.findAuraIndex(auraKey) !== null){
      let auraIndex = this.findAuraIndex(auraKey);

      let newAuraState = [...this.state.auras];
      newAuraState[auraIndex].specificAuraEffect = Number(newSpecificEffect);
      this.setState({ auras: newAuraState });
    }
   }


   changeGlobalAuraEffect(newAuraEffect, page){

    this.setState({auraEffect: {...this.state.auraEffect, [page]: {...this.state.auraEffect[page], amount: Number(newAuraEffect)}}});
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
   
   changeTreeNodes(){

    let newTreeStats = [...this.state.trees];
    //let index = trees.indexOf(tree);
    let newAuraEffect = 0;

    newTreeStats.forEach((cluster) => {
      
      newAuraEffect += cluster.clusterAuraEffect();
    })

    this.setState({trees: newTreeStats});
    this.changeGlobalAuraEffect(newAuraEffect, 'tree')
    
   }

   changeTimeless(newAuraEffect){

    this.setState({auraEffect: {...this.state.auraEffect, ['tree']: {...this.state.auraEffect['tree'], timeless: Number(newAuraEffect)}}});
   }

  render() {
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
                        <TreePage {...props} 

                        changeTimeless={this.changeTimeless.bind(this)}
                        changeTreeNodes={this.changeTreeNodes.bind(this)}
                          auras={auras} 
                          timeless={this.state.auraEffect.tree.timeless}
                          trees={trees}
                        />
                      )}
                    />

                   <Route path='/aurastatcalc/clusters'
                      
                      render = {(props) => (
                        <ClusterPage {...props} 

                          changeClusterAmount={this.changeClusterAmount.bind(this)}
                          changeGlobalAuraEffect={this.changeGlobalAuraEffect.bind(this)}
                          changeSpecificAuraEffect={this.changeSpecificAuraEffectClusters.bind(this)}
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
              
            <OutputBox aurasFromSkills={this.state.aurasFromSkills} clusters={this.state.clusters} auras={this.state.auras} globalAuraEffect={this.state.auraEffect.total()} />
          </div>
          </Router>
        </section>
    );
  }
}
 
export default App;