import React, { Component } from 'react'

export default class DisplayArmour extends Component {

    onChangeAuraEffect(e){
        
        let newAuraEffect = e.target.value;
        this.props.changeArmourGlobalEffect(Number(newAuraEffect), this.props.tag.toLowerCase());
    }

    render() {
        return (
            <div className='armours'>
                <div className='armour'>

                    <img src='img/cluster/notable.png' alt=''/>

                    <span className='title'>{this.props.name}</span>

                    <div className='inputs'>
                        <input onChange={this.onChangeAuraEffect.bind(this)} defaultValue={this.props.gear} type='number' min='0' max='80'/>
                    </div>
                </div>
         </div>          
        )
    }
}
