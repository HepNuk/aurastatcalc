import React, { Component } from 'react'
import DisplayArmour from './gearTabs/DisplayArmour';
import DisplayJewelry from './gearTabs/DisplayJewelry';
import DisplayWeapons from './gearTabs/DisplayWeapons';
import DisplayClusters from './clusterTabs/DisplayClusters';

export default class GearPage extends Component {

    render() {
        return (
            <div className='mainapp gem_grps'>
                <h1>Aura effect from gear</h1>
    
                <div className='armour_grps'>
                    <h2>Armours</h2>
                    <DisplayArmour gear={this.props.gear.armour.helm} changeArmourGlobalEffect={this.props.changeArmourGlobalEffect} name='Helmet' tag='HELM'/>
                    <DisplayArmour gear={this.props.gear.armour.body} changeArmourGlobalEffect={this.props.changeArmourGlobalEffect} name='Body Armour' tag='BODY' />
                    <DisplayArmour gear={this.props.gear.armour.gloves} changeArmourGlobalEffect={this.props.changeArmourGlobalEffect} name='Gloves' tag='GLOVES' />
                    <DisplayArmour gear={this.props.gear.armour.boots} changeArmourGlobalEffect={this.props.changeArmourGlobalEffect} name='Boots' tag='BOOTS' />
                </div>
                <div className='armour_grps'>
                    <hr />
                    <h2>Jewelry</h2>

                    <DisplayJewelry changeJewelryNumber={this.props.changeJewelryNumber} 
                        changeCorruption={this.props.changeJewelryCorruption} gear={this.props.gear.jewelry.amulet} 
                        auraSelectList={this.props.auraSelectList} name='Amulet' tag='AMULET'
                    />
                    
                    <DisplayJewelry changeJewelryNumber={this.props.changeJewelryNumber} 
                        changeCorruption={this.props.changeJewelryCorruption} gear={this.props.gear.jewelry.ring1} 
                        auraSelectList={this.props.auraSelectList} name='Ring 1' tag='RING1'
                    />
                    
                    <DisplayJewelry changeJewelryNumber={this.props.changeJewelryNumber} 
                        changeCorruption={this.props.changeJewelryCorruption} gear={this.props.gear.jewelry.ring2} 
                        auraSelectList={this.props.auraSelectList} name='Ring 2' tag='RING2'
                    />
                    
                    <DisplayJewelry changeJewelryNumber={this.props.changeJewelryNumber} 
                        changeCorruption={this.props.changeJewelryCorruption} gear={this.props.gear.jewelry.belt} 
                        auraSelectList={this.props.auraSelectList} name='Belt' tag='BELT'
                    /> 

                </div>
                <br />
                <div className='armour_grps'>
                    <hr />
                    <h2>Weapons</h2> 
                    <h3><label style={{ paddingLeft: '5px', lineHeight: '35px', height: '35px', width: '180px'}} className='armours'>
                        Two-Hand Weapon <input type='checkbox' />
                    </label></h3><br />
                    <DisplayWeapons twoHand='notice here that two hand is active' name='Weapon 1' />
                    <DisplayWeapons isDisabled='send disabled if two hand is active' name='Weapon 2' />
                </div>
                <div className='armour_grps'>
                    <hr />
                    <h1>Clusters</h1>
                     <DisplayClusters 
                        changeGearSection={this.props.changeGearSection}
                        changeClusterAmount={this.props.changeClusterAmount}
                        changeGlobalAuraEffect={this.props.changeGlobalAuraEffect}
                        clusters={this.props.clusters}
                />   </div>
            </div>
        )
    }
}
