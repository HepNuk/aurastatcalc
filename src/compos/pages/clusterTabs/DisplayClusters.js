import React, { Component } from 'react'
import DisplayCluster from './DisplayCluster';



export default class DisplayClusters extends Component {
      
    render() {
        return this.props.clusters.map((cluster) => (
                <DisplayCluster
                    changeGearSection={this.props.changeGearSection}
                    changeClusterAmount={this.props.changeClusterAmount}
                    changeGlobalAuraEffect={this.props.changeGlobalAuraEffect}
                    cluster={cluster}
                    indexCluster={this.props.clusters.indexOf(cluster)}
                />
        ));
    }
}
/* this.props.changeSpecificAuraEffect(cluster.auraEffect * cluster.amount, auraKey) */