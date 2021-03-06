import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Design from './Design';
import BankCard from './BankCard';
import presetsManger from '../API/presetsManager';
import { Loader, Dimmer, Button, Header, Icon, Modal } from 'semantic-ui-react'
class Bank extends Component {
    constructor(props) {
        super(props);
        this.slidingGrid = React.createRef();
    }
    state = {
        presets: []
    }

    componentDidMount() {
        this.renderBank();
    }

    renderBank() {
        presetsManger.getBank()
            .then(presets => {
                this.setState({ presets: presets });
            });
    }

    pushToPresetView = (evt) => {
        this.props.history.push(`/preset/${evt.target.id}`)
    }

    deletePreset = (evt) => {
        presetsManger.deletePreset(evt.target.id)
        .then(() => this.renderBank())
    }

    render() {
        return (
            <>
            <div style={{height: 'calc(100vh - 62px)', width: '100%', overflow: 'scroll' }}>
                {this.state.presets.map((preset, i) => (
                    <BankCard preset={preset} pushToPresetView={this.pushToPresetView} deletePreset={this.deletePreset} {...this.props}/>
                ))}
                </div>
            </>
        )
    }
}

export default Bank;