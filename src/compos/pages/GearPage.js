import React, { Component } from 'react'
import DisplayArmour from './gearTabs/DisplayArmour';
import DisplayJewelry from './gearTabs/DisplayJewelry';
import DisplayWeapons from './gearTabs/DisplayWeapons';


export default class GearPage extends Component {

    state ={
        twoHandWep: false
    }

    render() {
        return (
            <div className='mainapp gem_grps'>
                <h1>Aura effect from gear</h1>
                
                <div className='armour_grps'>
                    <hr />
                    <h2>Armours</h2>
                    <DisplayArmour name='Helmet' />
                    <DisplayArmour name='Body Armour' />
                    <DisplayArmour name='Gloves' />
                    <DisplayArmour name='Boots' />
                </div>
                <div className='armour_grps'>
                    <hr />
                    <h2>Jewelry</h2>
                    <DisplayJewelry name='Amulet' />
                    <DisplayJewelry name='Ring 1' />
                    <DisplayJewelry name='Ring 2' />
                    <DisplayJewelry name='Belt' /> 
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
            </div>
        )
    }
}
