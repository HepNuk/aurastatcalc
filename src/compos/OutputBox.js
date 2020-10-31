import React, { Component } from 'react'
import PropType from 'prop-types';
import Aura from './Aura';

export default class OutputBox extends Component {
    render() {

    return (
        <div className='page output'>
            <div className='output_box'>
                <div className='sticky'>
                    <h1>Aura Stats output</h1>
                    <p>
                        - {this.props.globalAuraEffect}% increased Aura Effect (Global)<br />
                        All Auras under are set to Level 21, alt quality 2 and 20%quality
                    </p>
                </div>
                    <Aura auras={this.props.auras} globalAuraEffect={this.props.globalAuraEffect}/>
            </div>
        </div>
    );
    }
}

//PropTypes
OutputBox.propTypes = {
    globalAuraEffect: PropType.object.isRequired,
    auras: PropType.object.isRequired
}