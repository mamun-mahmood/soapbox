import React from 'react'
import { Button, CloseButton, Modal } from 'react-bootstrap'

function ShowModalForIframes(props) {
    return (
        <div>
                 <Modal
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
       
          </Modal.Title>
          <CloseButton variant="white" aria-label="X" onClick={()=>props.closeModal()} />
        </Modal.Header>
        <Modal.Body  >
       
        </Modal.Body>
        <Modal.Footer>
          <Button  >Invite</Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default ShowModalForIframes