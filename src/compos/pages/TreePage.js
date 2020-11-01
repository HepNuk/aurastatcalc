import React, { Component } from 'react'
import DisplayTrees from './treeTabs/DisplayTrees';

export default class TreePage extends Component {
    render() {
        return (
            <div className='mainapp gem_grps'>
                <h1>Tree</h1>
                <DisplayTrees 
                    trees={this.props.trees}
                />    
            </div>
        )
    }
}
