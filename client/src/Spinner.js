import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class Spinner extends Component {

    spinnerStyle = {
        position: 'absolute',
        marginLeft: 'calc(50% - 51px)',
        marginTop: 'calc(50% - 51px)'
    };

    render() {
        if (this.props.isSendingRequest === true) {
            return (
                <Modal backdropStyle={{zIndex: 1050}} show={true}>

                    <div className="lds-default" style={this.spinnerStyle}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Modal>
            )
        }
        return null
    }
}

export default Spinner;