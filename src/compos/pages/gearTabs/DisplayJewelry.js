import React, { Component } from 'react'

export default class DisplayJewelry extends Component {

    onChangeCorruptionAura(e){

        let newSelectedItem = e.target.value;
        this.props.changeCorruption(newSelectedItem, this.props.tag.toLowerCase(), Number(e.target.id));
    }

    onChangeAuraPercent(e){

        let newAuraPercent = e.target.value; 
        this.props.changeJewelryNumber(newAuraPercent, this.props.tag.toLowerCase(), Number(e.target.id));
    }

    render() {
        return (
            <div className='armours'>
                <div className='armour'>

                <img src='img/cluster/notable.png' alt=''/>

                <span className='title'>{this.props.name}</span>
                <br/>
                <span className='title-corruption'>Corruption 1 :</span>
                <div className='inputs'>
                    <input id='1' min='0' max='80' type='number' defaultValue={this.props.gear.corruption1[0]} onChange={this.onChangeAuraPercent.bind(this)} />
                    <select id='1' defaultValue={this.props.gear.corruption1[1]} onChange={this.onChangeCorruptionAura.bind(this)} >
                            <option value='0' >None</option>
                            {this.props.auraSelectList.map((aura) => (
                                <option value={aura[1]} >{aura[2]}</option>
                            ))}
                    </select>
                </div>
                    <br/>
                <span className='title-corruption'>Corruption 2 :</span>
                <div className='inputs'>
                    <input id='2' min='0' max='80'  type='number' defaultValue={this.props.gear.corruption2[0]} onChange={this.onChangeAuraPercent.bind(this)} />
                    <select id='2' defaultValue={this.props.gear.corruption2[1]}  onChange={this.onChangeCorruptionAura.bind(this)} >
                            <option value='0' >None</option>
                            {this.props.auraSelectList.map((item) => (
                                <option value={item[0]+1} >{item[2]}</option>
                            ))}
                    </select>
                </div>
            </div>
     </div>  
        )
    }
}
