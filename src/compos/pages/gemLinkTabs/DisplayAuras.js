import React, { Component } from 'react'
import DisplayAura from './DisplayAura';
/*
    Logic for displaying grid of all auras
*/



export default class DisplayAuras extends Component {
    
    render() {
        console.log(this.props.auras);
        return this.props.auras.map((aura) => (
            <DisplayAura 

                changeGenoType={this.props.changeGenoType}
                changeGenoLevel={this.props.changeGenoLevel}
                changeAltQuality={this.props.changeAltQuality} 
                changeQuality={this.props.changeQuality} 
                changeLevel={this.props.changeLevel} 
                aura={aura}
                indexAura={this.props.auras.indexOf(aura)}
            />
         ));
    }
}
