import React, { Component } from 'react'

var tree = require('../../../treePassives').default;
var treecluster = tree[3];
export default class DisplayTree extends Component {
    render() {

        console.log(treecluster);

        return (
            <div>
                <div className='treeLabel'>

                <label for={treecluster.key}>
                    <div className='notables'>
                        <div className='notable'>
                            <img className='border' src='img/borders/notable_border.webp' />
                            <img src={`img/tree/${treecluster.key}.png`} />
                        </div>
                    
                        <input type='checkbox' id={treecluster.key} />
                        <span className='title'>{treecluster.notable.name}</span>
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
