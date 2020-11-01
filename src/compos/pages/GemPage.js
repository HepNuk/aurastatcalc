import React, { Component } from 'react'
import DisplayAuras from './gemLinkTabs/DisplayAuras';

export default class GemPage extends Component {
    onChangeGenoIcon(e){
        console.log(this.genoIcon);
        this.genoIcon = e.target.value;
    }

    render() {

        return (
            <div className='mainapp gem_grps'> 
                        <h1>Auras</h1>
                        <DisplayAuras 
                            changeGenoType={this.props.changeGenoType}
                            changeGenoLevel={this.props.changeGenoLevel}
                            changeAltQuality={this.props.changeAltQuality} 
                            changeQuality={this.props.changeQuality} 
                            changeLevel={this.props.changeLevel} 
                            auras={this.props.auras}
                        />      
            </div>
        )
    }
}

/* backup
<DisplayAuras changeAltQuality={this.props.changeAltQuality} changeQuality={this.props.changeQuality} changeLevel={this.props.changeLevel} auras={this.props.auras}/>

<div className='mainapp gem_page'> 
                <div className='gem_btn_grp'>
                    <button onClick={ this.handleChange.bind(this) } value='0'>Helmet</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='1'>Body</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='2'>Gloves</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='3'>Boots</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='4'>Ring 1</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='5'>Ring 2</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='6'>Weapon 1</button><div className='divider' />
                    <button onClick={ this.handleChange.bind(this) } value='7'>Weapon 2</button><hr />
                </div>
                <div className='gem_grps'>
                    {this.state.gemLinksPage.pages[this.state.gemLinksPage.pageSelected]}
                </div>
            </div>

            */
