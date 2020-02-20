import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import Design from './Design';
import ExploreCard from './ExploreCard';
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
        presetsManger.searchAll()
            .then(presets => {
                this.setState({ presets: presets });
            });
    }

    pushToPresetView = (evt) => {
        this.props.history.push(`/preset/${evt.target.id}`)
    }

    render() {
        return (
            <>
                <div style={{ height: 50, backgroundColor: 'black' }}>
                    <Input style={{ position: 'absolute', left: 68, top: 100 }} icon='search' placeholder='Search...' onChange={this.handleInputChange} />
                </div>
                <div style={{height: 'calc(100vh - 62px)', width: '100%', overflow: 'scroll' }}>
                {this.state.presets.map((preset, i) => (
                    <ExploreCard preset={preset} pushToPresetView={this.pushToPresetView}/>
                ))}
                </div>
            </>
        )
    }
}

export default Explore;