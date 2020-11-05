import React, { Component } from 'react'

export default class DisplayWeapons extends Component {
    render() {
        return (
            <div style={{width: '48.4%'}} className='armours'>
                <div className='armour'>

                    <img src='img/cluster/notable.png' alt=''/>

                    <span className='title'>{this.props.name}</span>
                    <br/>
                    <span className='title-corruption'>Aura Effect mod on Weapon</span>
                    <div className='inputs'>
                        <input type='number' />
                        <select >
                                <option value='0'>  None      </option>
                                <option value='1'>  Anger    </option>
                                <option value='2'>  ...      </option>
                        </select>
                    </div>
                        <br/>
                    <label>
                        <span className='title-corruption'>{`Auras from your skills grant ${2}% increased Damage to you and nearby allies`}</span>
                        <div className='inputs'>
                            <input style={{marginRight: '10px'}}type='checkbox' />
                        </div>
                    </label>
                </div>
            </div>   
        )
    }
}

//style={{width: '48.4%'}}