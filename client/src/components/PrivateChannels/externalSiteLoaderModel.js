import axios from 'axios';
import React, {useState} from 'react'
import { Button, CloseButton, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { SettingsSystemDaydream } from '@material-ui/icons';
function ExternalSiteLoaderModal(props) {
    const MyComponent=props.component
const [emails,setEmails]=useState([])
const [value,setValue]=useState("")
const [error,setError]=useState(null)
const clubname=props.clubname
const username=props.username
const clublink=props.clublink
const BaseURL = process.env.REACT_APP_API_URL;

    return (
        <div >
      <Modal 
        {...props}
       
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
         {props.title}
          </Modal.Title>
          <CloseButton variant="white" aria-label="X" onClick={()=>props.closeModal()} />
        </Modal.Header>
        <Modal.Body  >
            <h5>{props.title}</h5>
            <div >
            <iframe src={props.src}
                   title={props.title} width="100%" height="100%"></iframe>
     </div>
   
        </Modal.Body>
        <Modal.Footer>
          <Button  >Invite</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
  
//   function ModelShow() {
//     const [modalShow, setModalShow] = React.useState(true);
  
//     return (
//       <div>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//           Launch vertically centered modal
//         </Button>
  
//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//         />
//       </div>
//     );
//   }

  export default ExternalSiteLoaderModal