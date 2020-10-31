import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

    handleChange(e){
        const page = e.target.value;
        console.log(page);
        this.props.changePage(page);
    }

    render() {
        return (
            <div className='topnav'>
                <div className='divider' /><div className='divider' />
                    <Link to='/aurastatcalc/'>   
                        <button>Home</button>
                    </Link>
                <div className='divider' />
                    <Link to='/aurastatcalc/tree'>   
                        <button>Tree</button>
                    </Link>
                <div className='divider' />
                    <Link to='/aurastatcalc/clusters'>   
                        <button>Clusters</button>
                    </Link>
                <div className='divider' />
                    <Link to='/aurastatcalc/gear'>   
                        <button>Gear</button>
                    </Link>
                <div className='divider' />
                    <Link to='/aurastatcalc/auras'>
                        <button>Auras</button>
                    </Link>
            </div>
        )
    }
}