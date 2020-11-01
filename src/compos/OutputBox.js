import React, { Component } from 'react'
import PropType from 'prop-types';
import Aura from './Aura';
import Specials from './Specials';

export default class OutputBox extends Component {
    render() {

    return (
        <div className='page output'>
            <div className='output_box'>
                <div className='sticky'>
                    <h1>Aura Stats output</h1>
                    <p>
                        - {this.props.globalAuraEffect}% increased Aura Effect (Global)<br />
                    </p>
                </div>
                    <Aura auras={this.props.auras} globalAuraEffect={this.props.globalAuraEffect}/>
                    <Specials clusters={this.props.clusters} />
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