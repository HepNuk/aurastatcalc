import React, { Component } from 'react'

export default class DisplayTree extends Component {
    render() {


        return (
            <div>
                <div className='treeLabel'>

                <label for={this.props.tree.key}>
                    <div className='notables'>
                        <div className='notable'>
                            <img className='border' src='img/borders/notable_border.webp' />
                            <img src={`img/tree/${this.props.tree.key}.png`} />
                        </div>
                    
                        <input type='checkbox' id={this.props.tree.key} />
                        <span className='title'>{this.props.tree.notable.name}</span>
                    </div>
                </label>
                

                <label>
                <div className='smalls'>
                        <div className='smallpassives'>
                            <img className='border' src='img/borders/small_border.webp' />
                            <img src={`img/tree/effect.png`} />
                            
                        </div>
                        <input type='checkbox' />
                        <span className='title'>6% aura effect</span>
                </div>
                </label>
                
                </div>
            </div>

        )
    }
}
