import React, { Component } from 'react'
import PropType from 'prop-types';
import Aura from './Aura';

export default class OutputBox extends Component {
    render() {

    return (
        <div className='page output'>
            <div className='output_box'>
                <p>
                    <h1>Aura Stats output</h1>
                    Prismatic Jewel<br />
                    Quality: 0 <br />
                    Implicits: 0
                </p>
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