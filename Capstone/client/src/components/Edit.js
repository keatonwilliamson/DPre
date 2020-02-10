import React, { Component } from 'react';
import Design from './Design';
import presetsManger from '../API/presetsManager';
class Edit extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        preset: {},
    }


    componentDidMount() {
        presetsManger.getPreset(this.props.presetId)
            .then(preset => {
                console.log(preset)
                this.setState({ preset: preset });
            });
    }

    // componentWillReceiveProps(props) {
    //   if (props.presetId) {
    //     console.log("recieved presetid--- from component will recieve props on Design")
    //     this.setState({ settings: this.props.match.params.presetId });
    //   }
    // };

    render() {
        return (
            <Design preset={this.state.preset} {...this.props}/>
        )
    }
}

export default Edit;