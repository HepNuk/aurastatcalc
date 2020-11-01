import React, { Component } from 'react'

export default class Specials extends Component {
    render() {

        let printSpecials = (cluster) => {

            let tempString = [];

            if(cluster.special === true && cluster.amount > 0){
                
                tempString.push(<li className='aura_name'>{'~ '+ cluster.name +' ~'}</li>);
                

                let effects = cluster.effect();
                
                for(const effect of effects){
                    tempString.push(<li className='aura_stat'>{effect}</li>);
                }
            }
            if (tempString.length !== 0){
                tempString.push(<li key={cluster.key} className='aura_sepa'>{'~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~'}</li>);
            }

            return tempString.map((stat) => (stat))
        }

        return this.props.clusters.map((cluster) => (
            printSpecials(cluster)
        ));
    }
}
