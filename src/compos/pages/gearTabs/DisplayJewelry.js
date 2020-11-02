import React, { Component } from 'react'

export default class DisplayJewelry extends Component {



    render() {
        return (
            <div className='armours'>
                <div className='armour'>

                <img src='img/cluster/notable.png' alt=''/>

                <span className='title'>{this.props.name}</span>
                <br/>
                <span className='title-corruption'>Corruption 1 :</span>
                <div className='inputs'>
                    <input type='number' />
                    <select >
                            <option value='0'>  None      </option>
                            <option value='1'>  Anger    </option>
                            <option value='2'>  ...      </option>
                    </select>
                </div>
                    <br/>
                <span className='title-corruption'>Corruption 2 :</span>
                <div className='inputs'>
                    <input type='number' />
                    <select >
                            <option value='0'>  None      </option>
                            <option value='1'>  Anger    </option>
                            <option value='2'>  ...      </option>
                    </select>
                </div>
            </div>
     </div>  
        )
    }
}
