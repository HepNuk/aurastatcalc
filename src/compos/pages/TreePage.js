import React, { Component } from 'react'
import DisplayTrees from './treeTabs/DisplayTrees';

export default class TreePage extends Component {

    onChangeTimeless(e){
        this.props.changeTimeless(e.target.value);
    }
    render() {
        return (
            <div className='mainapp gem_grps'>
                <h1>Tree</h1>
                <DisplayTrees 
                    changeTreeNodes={this.props.changeTreeNodes}
                    trees={this.props.trees}
                />
                 
                 <div className='treeLabel'>
                    <label>
                        <div className='notables'>
                            <div className='notable'>
                                
                                <img src={`img/tree/timless.png`} />
                            </div>
                            <input onChange={this.onChangeTimeless.bind(this)} type='number' min='0' max='100'/>
                            <span className='title'>%Aura Effect</span>
                        </div>
                    </label>
                </div>    
            </div>
        )
    }
}
