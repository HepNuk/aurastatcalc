import React, { Component } from 'react'

export default class DisplayArmour extends Component {
    render() {
        return (
            <div className='armours'>
                <div className='armour'>

                    <img src='img/cluster/notable.png' alt=''/>

                    <span className='title'>{this.props.name}</span>

                    <div className='inputs'>
                        <input type='number' min='0' max='80'/>
                    </div>
                </div>
         </div>          
        )
    }
}
