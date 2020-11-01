import React, { Component } from 'react'
import DisplayClusters from './clusterTabs/DisplayClusters';

export default class ClusterPage extends Component {
    render() {
        return (
            <div className='mainapp gem_grps'>
                <h1>Clusters</h1>
                <DisplayClusters 

                    changeClusterAmount={this.props.changeClusterAmount}
                    changeGlobalAuraEffect={this.props.changeGlobalAuraEffect}
                    changeSpecificAuraEffect={this.props.changeSpecificAuraEffect}
                    clusters={this.props.clusters}
                />    
            </div>
        )
    }
}
