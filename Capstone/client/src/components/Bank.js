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


                <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
                    <Header icon='archive' content='Archive Old Messages' />
                    <Modal.Content>
                        <p>
                            Your inbox is getting full, would you like us to enable automatic
                            archiving of old messages?
      </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted>
                            <Icon name='remove' /> No
      </Button>
                        <Button color='green' inverted>
                            <Icon name='checkmark' /> Yes
      </Button>
                    </Modal.Actions>
                </Modal>
                {/* {this.state.presets.map((preset, i) => (
                    <p className="preset" key={i} onClick={() => this.pushToEditView(preset.id)} >{preset.presetName}</p>
                ))} */}
            </>
        )
    }
}

export default Bank;