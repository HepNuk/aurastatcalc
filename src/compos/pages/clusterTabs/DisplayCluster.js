import React, { Component } from 'react'

export default class DisplayCluster extends Component {

    onChangeCluster(e){
        this.props.cluster.amount = e.target.value;

        this.props.changeClusterAmount(e.target.value, this.props.indexCluster)
        this.props.changeGlobalAuraEffect(this.props.changeGearSection(), 'cluster');
        
    }

    render() {
        return (
            <div className='armours'>
                <div className='armour'>

                    <img src='img/cluster/notable.png' alt=''/>

                    <span className='aura_title'>{this.props.cluster.name}</span>

                    <div className='inputs'>
                        <input onChange={this.onChangeCluster.bind(this)} defaultValue={this.props.cluster.amount} type='number' min='0' max='80'/>
                    </div>
                </div>          
            </div>
        )
    }
}
