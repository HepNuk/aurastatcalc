import React, { Component } from 'react'

export default class DisplayWeapons extends Component {

    twoHandActive(){

        if (this.props.twohand){
            return 4
        }
        else {
            return 2
        }
    }

    onChangeAura(e){
        
        let newAura = e.target.value;
        this.props.changeAuraWeapon(newAura, this.props.tag.toLowerCase());
    }

    onChangeAuraPercent(e){
        let newAuraEffect = e.target.value;
        this.props.changeAuraPercentWeapon(newAuraEffect, this.props.tag.toLowerCase());
    }

    onChangeAuraFromSkills(e){
        
        
        this.props.aurasFromSkills.forEach((auraMod) => {
            

            if (this.props.twohand !== true){
                if(auraMod.key === this.props.tag){

                    if(auraMod.key === this.props.tag){
                        auraMod.active = !auraMod.active
                    }
                    
                    if(this.props.isDisabled){
                        auraMod.active = false;
                    }
                }
            } else {
                
                if(auraMod.key === 'WEPTWO'){
                   auraMod.active = !auraMod.active;
                }
            }
            
        });

        this.props.changeAurasWithSkillMod();
    }

    aurasFromSkillIsActive(){
        let isActive;
        this.props.aurasFromSkills.forEach((auraMod) => {
            if(auraMod.key === this.props.tag) isActive = auraMod.active;
            
            if(this.props.twohand && auraMod.key === 'WEPTWO' && auraMod.active) 
                isActive = auraMod.active;
        });

        return isActive;
    }

    render() {
        return (
            <div style={{width: '48.4%'}} className='armours'>
                <div style={this.props.isDisabled ? { opacity: '0.20', textDecoration: 'line-through'}: {}} className='armour'>

                    <img src='img/cluster/notable.png' alt=''/>

                    <span className='title'>{this.props.name}</span>
                    <br/>
                    <span className='title-corruption'>Aura Effect mod on Weapon</span>
                    <div className='inputs'>
                        <input defaultValue={this.props.gear[0]} onChange={this.onChangeAuraPercent.bind(this)} type='number' />
                        <select defaultValue={this.props.gear[1]} onChange={this.onChangeAura.bind(this)}>
                            <option value='0' >None</option>
                            {this.props.auraSelectList.map((aura) => (
                                <option value={aura[1]} >{aura[2]}</option>
                            ))}
                        </select>
                    </div>
                        <br/>
                    <label>
                        <span className='title-corruption'>{`Auras from your skills grant ${this.twoHandActive()}% increased Damage to you and nearby allies`}</span>
                        <div className='inputs'>
                            <input onChange={this.onChangeAuraFromSkills.bind(this)} checked={this.aurasFromSkillIsActive()} style={{marginRight: '10px'}} type='checkbox' />
                        </div>
                    </label>
                </div>
            </div>   
        )
    }
}

//style={{width: '48.4%'}}