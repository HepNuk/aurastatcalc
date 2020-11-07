import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from './compos/NavBar';
import OutputBox from './compos/OutputBox';
import AscendancyPage from './compos/pages/AscendancyPage';
import TreePage from './compos/pages/TreePage';
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

    auraSelectListLoaded: false,
    auraSelectList: [], // [id, key, title]

    gear: {
      armour:{
        helm: 0,
        body: 0,
        gloves: 0,
        boots: 0,
        total: function() {return this.helm + this.body + this.gloves + this.boots}
      },
      jewelry:{
        amulet: {corruption1: [0, 0], corruption2: [0, 0], },
        ring1: {corruption1: [0, 0], corruption2: [0, 0], },
        ring2: {corruption1: [0, 0], corruption2: [0, 0], },
        belt: {corruption1: [0, 0], corruption2: [0, 0], },
      },
      weapons:{
        weapon1: [0, 0],
        weapon2: [0, 0],
        twohand: false,
      },
      
    },

    auraEffect: {
      asc: {
        selected: 0,
        options: [0, 10, 5],
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

  generateAuraSelectList = function(){


    let selectMenuList = [];
    
    for (let i = 0; i < auras.length; i++){
        
        selectMenuList.push([i, auras[i].key, auras[i].title])
    }
    return selectMenuList;
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

   changeSpecificAuraEffect(auraEffectPerKey){

    let newAuraStat = [...this.state.auras];

    newAuraStat.forEach((aura) => {aura.specificAuraEffect = 0});
    
    
    auraEffectPerKey.forEach((auras) => {
      let auraIndex = this.findAuraIndex(auras[0]);
      if(auraIndex !== null){
        newAuraStat[auraIndex].specificAuraEffect = Number(auras[1]);
      }
    });


    this.setState({ auras: newAuraStat });

   }

   changeGearSection(){

    let tempArray = [];
    let tempGear = this.state.gear.jewelry;

    Object.keys(tempGear).forEach((piece) => {
      Object.keys(tempGear[piece]).forEach((corruption) => {
        if (tempGear[piece][corruption][0] !== 0 && tempGear[piece][corruption][1] !== 0){
          tempArray.push([tempGear[piece][corruption][1], Number(tempGear[piece][corruption][0])])
        }
      })
    });


 

    if(this.state.gear.weapons.weapon1 !== 0 && this.state.gear.weapons.weapon1 !== 0){
      tempArray.push([this.state.gear.weapons.weapon1[1], this.state.gear.weapons.weapon1[0]]);
    }

    if(!this.state.gear.weapons.twohand && 
        this.state.gear.weapons.weapon1 !== 0 && 
          this.state.gear.weapons.weapon1 !== 0){

      tempArray.push([this.state.gear.weapons.weapon2[1], this.state.gear.weapons.weapon2[0]]);
    }

  
  

    let globalAuraEffect = 0;
    clusters.forEach(cluster => {
      if (cluster.affects !== undefined){
        if ( cluster.affects.length === 0 ){
          globalAuraEffect += (cluster.auraEffect * cluster.amount);
        } else {
          if (cluster.auraEffect.length === undefined){
           
            cluster.affects.forEach((auraKey) => {
              tempArray.push([auraKey, (cluster.auraEffect * cluster.amount)])
             })

          } else {

            for (let i = 0; i < cluster.affects.length; i++){
              cluster.affects[i].forEach((auraKey) => {
                tempArray.push([auraKey, (cluster.auraEffect[i] * cluster.amount)])  
            })
            }
          }
        }
      }
    });

    let reduced = [];
    for (let i = 0; i < tempArray.length; i++){

      let uniqueKey = tempArray[i][0];
      let found = false;

      for (let j = 0; j < reduced.length; j++){
          if (reduced[j][0] === uniqueKey){
            reduced[j][1] += tempArray[i][1];
            found = true;
            break;
          }
      }

      if(!found){
        reduced.push(tempArray[i]);
      } 
    }
    this.changeSpecificAuraEffect(reduced);
    return globalAuraEffect;
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

    this.setState({auraEffect: {...this.state.auraEffect, tree: {...this.state.auraEffect.tree, timeless: Number(newAuraEffect)}}});
   }


   changeJewelryCorruption(newValue, jewelry, corruption){

    corruption = 'corruption'+corruption;

    let newstate = this.state.gear;
    let newArray = newstate.jewelry[jewelry][corruption]
    newArray[1] = newValue;

    newstate.jewelry[jewelry][corruption] = Object.values(newArray);
   

    this.setState({ gear: newstate });

    this.changeGearSection();
   }

   changeJewelryNumber(newValue, jewelry, corruption){

    corruption = 'corruption'+corruption;

    let newstate = this.state.gear;
    let newArray = newstate.jewelry[jewelry][corruption]
    newArray[0] = Number(newValue)

    newstate.jewelry[jewelry][corruption] = Object.values(newArray);
   
    this.setState({ gear: newstate });

    this.changeGearSection();
   }

   changeArmourGlobalEffect(newValue, armour){

    let newState = this.state.gear;
    newState.armour[armour] = newValue;
    this.setState({gear: newState});

    newState = this.state.auraEffect;
    newState.gear.amount = this.state.gear.armour.total();
    this.setState({auraEffect: newState}); 

   }

   changeTwoHand(newBoolean){
    let newState = this.state.gear;

    newState.weapons.twohand = newBoolean
    console.log(newBoolean)
    this.setState({gear: newState});
   }

   changeAuraPercentWeapon(newValue, whichWeapon){

    let newstate = this.state.gear;
    let newArray = newstate.weapons[whichWeapon]
    newArray[0] = Number(newValue);

    newstate.weapons[whichWeapon] = Object.values(newArray);
   

    this.setState({ gear: newstate });

    this.changeGearSection();
   }

   changeAuraWeapon(newValue, whichWeapon){
    console.log('hi')
    let newstate = this.state.gear;
    let newArray = newstate.weapons[whichWeapon]
    newArray[1] = newValue;

    newstate.weapons[whichWeapon] = Object.values(newArray);

    this.setState({ gear: newstate });


    this.changeGearSection();
   }

   changeAurasWithSkillMod(){

    this.setState({aurasFromSkills: aurasFromSkills});

   }

  render() {
      if(!this.state.auraSelectListLoaded){
          this.setState({auraSelectList: this.generateAuraSelectList()});
          this.setState({auraSelectListLoaded: true});
      }

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
                    
                    <Route path='/aurastatcalc/gear'
                      
                      render = {(props) => (
                        <GearPage {...props} 

                          changeAurasWithSkillMod={this.changeAurasWithSkillMod.bind(this)}
                          changeAuraPercentWeapon={this.changeAuraPercentWeapon.bind(this)}
                          changeAuraWeapon={this.changeAuraWeapon.bind(this)}
                          changeTwoHand={this.changeTwoHand.bind(this)}
                          changeArmourGlobalEffect={this.changeArmourGlobalEffect.bind(this)}
                          changeJewelryNumber={this.changeJewelryNumber.bind(this)}
                          changeGearSection={this.changeGearSection.bind(this)}
                          changeClusterAmount={this.changeClusterAmount.bind(this)}
                          changeGlobalAuraEffect={this.changeGlobalAuraEffect.bind(this)}
                          changeSpecificAuraEffect={this.changeSpecificAuraEffect.bind(this)}
                          clusters={clusters}
                          auras={auras} 
                          aurasFromSkills={aurasFromSkills}
                          gear={this.state.gear}
                          auraSelectList={this.state.auraSelectList}
                          changeJewelryCorruption={this.changeJewelryCorruption.bind(this)}
                          />
                          
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