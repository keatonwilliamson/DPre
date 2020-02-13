import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Design from './Design';
import presetsManger from '../API/presetsManager';
import { Input, Header, Icon, Image, Menu, Segment, Sidebar, Loader, Dimmer } from 'semantic-ui-react'
import { debounce } from 'lodash';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.slidingGrid = React.createRef();
    }
    state = {
        queryString: "",
        presets: [],
    }



    componentDidMount() {
        this.renderBank();
    }

    handleInputChange = (evt) => {
        this.setState({ queryString: evt.target.value }, () => {
            this.search()
        })
    }

    search = debounce(() => {
        presetsManger.searchAll(this.state.queryString)
            .then(response => this.setState({ presets: response }))
    }, 80);

    renderBank() {
        // presetsManger.getBank()
        //     .then(presets => {
        //         this.setState({ presets: presets });
        //     });
        presetsManger.searchAll()
            .then(presets => {
                this.setState({ presets: presets });
            });


    }

    pushToPresetView(id) {
        this.props.history.push(`/preset/${id}`)
    }

    deletePreset(id) {
        presetsManger.deletePreset(id)
            .then(() => this.renderBank())
    }

    render() {
        return (
            <>
                <div style={{ height: 50, backgroundColor: 'black' }}>
                    <Input style={{ position: 'absolute', left: 68, top: 100 }} icon='search' placeholder='Search...' onChange={this.handleInputChange} />
                </div>
                {this.state.presets.map((preset, i) => (
                    <div className="preset" key={i}>
                        <p onClick={() => this.pushToPresetView(preset.id)} >{preset.presetName}</p>
                        {/* <p onClick={() => this.deletePreset(preset.id)}>DELETE</p> */}
                    </div>
                ))}
            </>
        )
    }
}

export default Explore;