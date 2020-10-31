import React, { Component } from 'react'


export default class Aura extends Component {
    render() {
        let printEffects = (aura, globalEffect) => {

            let tempString = [];

            if(aura.level > 0 && aura.level <= 40){

                tempString.push(<li className='aura_name'>{'~ '+ aura.title +' ~'}</li>);
                
                let effects = aura.printEffect(globalEffect);

                for(const effect of effects){
                    tempString.push(<li className='aura_stat'>{effect}</li>);
                }
            }

            if(aura.level > 0 && aura.quality > 0 && aura.statPerQuality[aura.altQuality] !== 0){
                let effects = aura.printQuality(globalEffect);

                for(const effect of effects){
                    tempString.push(<li className='aura_stat'>{effect}</li>);
                }
            }

            if (tempString.length !== 0){
                tempString.push(<li className='aura_sepa'>{'~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~'}</li>);
            }
        
            return tempString.map((stat) => (stat))
        }

        return Object.entries(this.props.auras).map((aura) => (
                printEffects(aura[1], this.props.globalAuraEffect)
        ));
    }
}
