import React, { Component } from 'react'
import DisplayTree from './DisplayTree';


export default class DisplayTrees extends Component {
    render() {
        return this.props.trees.map((tree) => (
            <DisplayTree 
            changeTreeNodes={this.props.changeTreeNodes}
                tree={tree}
            />
               
         ));
    }
}
