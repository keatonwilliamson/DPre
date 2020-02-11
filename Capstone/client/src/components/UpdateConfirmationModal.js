import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const UpdateConfirmationModal = (props) => (
  <Modal open={true} basic size='small'>
    <Modal.Content>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{ fontSize: '36px', flex: '0 0 100%', textAlign: 'center' }}>Save your changes to this preset?</p>
        <div style={{
          flex: '0 0 100%',
          display: 'flex',
          // flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button style={{ margin: 20 }} className="large-white-outline-button" type="button"
            onClick={() => {
              props.closeSaveModal();
              props.showForm();
            }}>BACK</button>
          <button style={{ margin: 20 }} className="large-white-outline-button" type="button" onClick={props.handleUpdate}>SAVE</button>
        </div>
        <p style={{
          flex: '0 0 100%',
          textAlign: 'center',
          fontSize: '36px'
          // display: 'flex',
          // flexWrap: 'wrap',
          // justifyContent: 'center',
          // alignItems: 'center'
        }}>-or-</p>
        <button style={{ margin: 20, fontSize: '26px'}} className="large-white-outline-button" type="button" onClick={props.handleSubmit}>SAVE AS NEW PRESET</button>
      </div>
    </Modal.Content>
    {/* <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions> */}
  </Modal>
)

export default UpdateConfirmationModal