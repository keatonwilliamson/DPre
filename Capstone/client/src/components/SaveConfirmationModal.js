import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const SaveConfirmationModal = (props) => (
  <Modal open={true} basic size='small'>
    <Modal.Content>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{ fontSize: '36px', flex: '0 0 100%', textAlign: 'center' }}>Save this preset to your bank?</p>
        <div >
          <button style={{ margin: 20 }} className="large-white-outline-button" type="button"
            onClick={() => {
              props.closeSaveModal();
              props.showForm();
            }}>
            BACK
                    </button>
          <button style={{ margin: 20 }} className="large-white-outline-button" type="button" onClick={props.handleSubmit}>SAVE</button>
        </div>
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

export default SaveConfirmationModal