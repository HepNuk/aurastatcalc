import React, { Component } from 'react'

export default class DisplayAura extends Component {


    //onChange methodes for every diffrent type of change that can occure to an aura
    onChangeLevel(e){

        this.props.aura[1].level = e.target.value;
        this.props.changeLevel(e.target.value, this.props.aura[0]);
    }

    onChangeQuality(e){

        this.props.aura[1].quality = e.target.value;
        this.props.changeQuality(e.target.value, this.props.aura[0]);
    }

    onChangeAltQuality(e){
        
        this.props.aura[1].altQuality = e.target.value;
        this.props.changeAltQuality(e.target.value, this.props.aura[0]);
    }

    onChangeGenoType(e){
        this.props.aura[1].generosityType = e.target.value;
        this.props.changeGenoType(e.target.value, this.props.aura[0]);
    }

    onChangeGenoLevel(e){
        this.props.aura[1].generosityLevel = e.target.value;
        this.props.changeGenoLevel(e.target.value, this.props.aura[0]);
    }

    //Not All Auras have 3 Alt Qualities
    altQualityThree(altQualityBonuses){
        
        if(altQualityBonuses.length > 3)
        return (<option value='3'>Phantas   </option>)
        else return null;
    }

    render() {
        console.log(this.props)

        
        return (

            <div className='auras'>
                <div className='generosity'>
                    <img src={"img/aura/"+ this.props.aura[0].toLowerCase() +".png"}/>
                    <span className='aura_title'>{this.props.aura[1].title}</span>
                    
                    <div className='inputs'>
                    
                    <img src='img/gem/generosity.png'/>
                
                        <select onChange={this.onChangeGenoType.bind(this)} defaultValue={this.props.aura[1].generosityType}>
                            <option value='0'>None</option>
                            <option value='1'>Generosity</option>
                            <option value='2'>Awakened</option>
                        </select>

                        <input onChange={this.onChangeGenoLevel.bind(this)} defaultValue={this.props.aura[1].generosityLevel} type='number' min='0' max='40' placeholder='Lvl' />
                    </div>
                </div>
                <div className='aura'>
                <img src={"img/gem/"+ this.props.aura[0].toLowerCase() +".png" }/>

                    
                    <div className='inputs'>
                        <span className='details'>Lvl: </span>
                        <input onChange={this.onChangeLevel.bind(this)}     defaultValue={this.props.aura[1].level} type='number' min='0' max='40'  placeholder='Lvl' />
                        <span className='details'>Qual: </span>
                        <input onChange={this.onChangeQuality.bind(this)} defaultValue={this.props.aura[1].quality} type='number' min='0' max='100' placeholder='Qlty' />
                        <span className='details'>Alt: </span>
                        <select onChange={this.onChangeAltQuality.bind(this)} defaultValue={this.props.aura[1].altQuality}>
                            <option value='0'>  None      </option>
                            <option value='1'>  Diverg    </option>
                            <option value='2'>  Anom      </option>
                            {this.altQualityThree(this.props.aura[1].effectOfQuality)}
                        </select>
                    </div>

                    
                </div>
            </div>
        )
    }
}
