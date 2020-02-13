import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Design from './Design';
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

    pushToPresetView(id) {
        this.props.history.push(`/preset/${id}`)
    }

    deletePreset (id) {
        presetsManger.deletePreset(id)
        .then(() => this.renderBank())
    }

    render() {
        return (
            <>
                {this.state.presets.map((preset, i) => (
                    <div className="preset" key={i}>
                        <p onClick={() => this.pushToPresetView(preset.id)} >{preset.presetName}</p>
                        <p onClick={() => this.deletePreset(preset.id)}>DELETE</p>
                        <p></p>
                        <p></p>
                        <p></p>
                        <p></p>
                    </div>
                ))}
            </>
        )
    }
}

export default Bank;