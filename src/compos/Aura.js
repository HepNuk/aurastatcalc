import React, { Component } from 'react'


export default class Aura extends Component {
    render() {
        let printEffects = (aura, globalEffect) => {

            let tempString = [];

            if(aura.level > 0 && aura.level <= 40){
                let effects = aura.printEffect(globalEffect);

                for(const effect of effects){
                    tempString.push(effect);
                }
            }

            if(aura.quality > 0 && aura.altQuality !== 0){
                let effects = aura.printQuality(globalEffect);

                for(const effect of effects){
                    tempString.push(effect);
                }
            }
        
            return tempString.map((stat) => (<li className='aura_stat'>{stat}</li>))
        }

        return Object.entries(this.props.auras).map((aura) => (
                printEffects(aura[1], this.props.globalAuraEffect)
        ));
    }
}
