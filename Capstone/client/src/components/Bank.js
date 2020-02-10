import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Design from './Design';
import presetsManger from '../API/presetsManager';
class Bank extends Component {
    constructor(props) {
        super(props);
        this.slidingGrid = React.createRef();
    }
    state = {
        presets: []
    }

    componentDidMount() {
        presetsManger.getAllPresets()
            .then(presets => {
                console.log("from bank component did mount", presets)
                this.setState({ presets: presets });
            });
    }

    pushToEditView(id) {
        this.props.history.push(`/edit/${id}`)
    }

    render() {
        return (
            <>
                {this.state.presets.map((preset, i) => (
                    <p className="preset" key={i} onClick={() => this.pushToEditView(preset.id)} >{preset.presetName}</p>
                ))}
            </>
        )
    }
}

export default Bank;