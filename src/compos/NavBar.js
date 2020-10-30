import React, { Component } from 'react'

export default class NavBar extends Component {

    handleChange(e){
        const page = e.target.value;
        console.log(page);
        this.props.changePage(page);
    }

    render() {
        return (
            <div className='topnav'>
                <button onClick={ this.handleChange.bind(this) } value='0' >Ascendancy</button><div className='divider' />
                <button onClick={ this.handleChange.bind(this) } value='1' >Tree</button><div className='divider' />
                <button onClick={ this.handleChange.bind(this) } value='2' >Clusters</button><div className='divider' />
                <button onClick={ this.handleChange.bind(this) } value='3' >Gear</button><div className='divider' />
                <button onClick={ this.handleChange.bind(this) } value='4' >Gem Links</button>
            </div>
        )
    }
}