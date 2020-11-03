import React, { Component } from 'react'

export default class AuraMods extends Component {
    
    
    
    render() {

        let printActiveMods = (mod) => {
            
            let tempString = [];

            if(mod.active){

                tempString.push(<li className='aura_name'>{`~ ${mod.source} ~`}</li>);

                
               
                let auraModsGrp = mod.printEffect(this.props.auras, this.props.globalAuraEffect);
                auraModsGrp.forEach(line => {
                    tempString.push(<li className='aura_stat'>{line}</li>)
                }) 
            }

            return tempString.map((line) => (line))
        }

        return this.props.aurasFromSkills.map((mod) => (
            printActiveMods(mod)
        ))
    }
}
