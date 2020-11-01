import React, { Component } from 'react'

export default class DisplayTree extends Component {
    
    hasBorder(){

        if(this.props.tree.notable.hasBorder){
            return <img className='border' src='img/borders/notable_border.webp' />
        } else return null;
    }

    isMotmON() {
        if(this.props.tree.motm){
            return 1.5;
        } else return 1;
    }

    renderMOTM(){

        if(this.props.tree.canHaveMOTM){
            return( <label>
                        <div className='motm'>
                                <div className='motmpassives'>
                                    <img src={`img/tree/motm.png`} />
                                </div>
                                <input onClick={this.onChangeMOTM.bind(this)} value={this.props.tree.key} checked={this.props.tree.motm} type='checkbox' />
                                <span className='title'>Might of the Meek</span>
                                
                        </div>
                </label>)
        } else return null;
    }

    onChangeSmallNode(e){

        this.props.tree.smallPassives[e.target.value][1] = !this.props.tree.smallPassives[e.target.value][1];
        this.props.changeTreeNodes();
    }

    onChangeNotable(e){
        //console.log(e.target.value)
        this.props.tree.notable.isActive = !this.props.tree.notable.isActive;
        this.props.changeTreeNodes();
    }

    onChangeMOTM(e){

        this.props.tree.motm = !this.props.tree.motm;
        this.props.changeTreeNodes();

    }
    


    render() {
        //console.log(this.props.tree)
        return (
            <div>
                <div className='treeLabel'>

                <label>
                    <div className='notables'>
                        <div className='notable'>
                            {this.hasBorder()}
                            <img src={`img/tree/${this.props.tree.key.toLowerCase()}.png`} />
                        </div>
                    
                        <input onChange={this.onChangeNotable.bind(this)} value={this.props.tree.key} type='checkbox' id={this.props.tree.key.toLowerCase()} checked={this.props.tree.notable.isActive}/>
                        <span className='title'>{this.props.tree.notable.name}</span>
                    </div>
                </label>

                {this.props.tree.smallPassives.map((smallNode) => (
                    <label>
                        <div className='smalls'>
                                <div className='smallpassives'>
                                    <img className='border' src='img/borders/small_border.webp' />
                                    <img src={`img/tree/effect.png`} />
                                </div>
                                <input value={this.props.tree.smallPassives.indexOf(smallNode)} onClick={this.onChangeSmallNode.bind(this)} checked={smallNode[1]} type='checkbox' />
                                <span className='title'>{6 * this.isMotmON()}% aura effect</span>
                        </div>
                    </label>
                ))}
                
                {this.renderMOTM()}
                </div>
            </div>

        )
    }
}

/*
<label>
                <div className='smalls'>
                        <div className='smallpassives'>
                            <img className='border' src='img/borders/small_border.webp' />
                            <img src={`img/tree/effect.png`} />
                            
                        </div>
                        <input type='checkbox' />
                        <span className='title'>6% aura effect</span>
                </div>
                </label>*/