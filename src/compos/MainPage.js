import React, { Component } from 'react'
import PropType from 'prop-types';


export default class MainPage extends Component {
    render() {
        
        return (
            <div className='page main'>
                {this.props.content.pages[this.props.content.pageSelected]}
            </div>
        )
    }
}

//PropTypes
MainPage.PropType = {
    auras: PropType.object.isRequired,
    content: PropType.object.isRequired
}