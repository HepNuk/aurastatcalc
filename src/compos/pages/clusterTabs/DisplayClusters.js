import React, { Component } from 'react'
import DisplayCluster from './DisplayCluster';



export default class DisplayClusters extends Component {
    
    calculateClusterAuraEffect(){

        let auraEffect = 0;

        this.props.clusters.forEach((cluster) => {   
            if(cluster.affects !== undefined){ 
                if( cluster.affects.length === 0 ){
                    auraEffect += (cluster.auraEffect * cluster.amount);
                
                } else {
                    if(cluster.auraEffect.length === undefined){
                        
                        cluster.affects.forEach((auraKey) => {
                            this.props.changeSpecificAuraEffect((cluster.auraEffect * cluster.amount), auraKey)   
                        })
                    } else {
                        
                        for (let i = 0; i< cluster.affects.length; i++){

                            cluster.affects[i].forEach((auraKey) => {
                                this.props.changeSpecificAuraEffect((cluster.auraEffect[i] * cluster.amount), auraKey)   
                            })
                        }
                    }
                }
                
            } 
        });

        return auraEffect;
    }
    
    render() {
        return this.props.clusters.map((cluster) => (
                <DisplayCluster

                    changeClusterAmount={this.props.changeClusterAmount}
                    calcClusterAuraEffect={this.calculateClusterAuraEffect.bind(this)}
                    changeGlobalAuraEffect={this.props.changeGlobalAuraEffect}
                    cluster={cluster}
                    indexCluster={this.props.clusters.indexOf(cluster)}
                />
        ));
    }
}
/* this.props.changeSpecificAuraEffect(cluster.auraEffect * cluster.amount, auraKey) */