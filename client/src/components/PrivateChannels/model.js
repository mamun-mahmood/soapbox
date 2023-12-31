import axios from 'axios';
import React, { useState } from 'react'
import { Button, CloseButton, Modal } from 'react-bootstrap';
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { SettingsSystemDaydream } from '@material-ui/icons';
import { FaWindowClose } from "react-icons/fa";
import { SoapboxTooltip } from '../SoapboxTooltip';
import { IoCloseCircle } from 'react-icons/io5';
function MyVerticallyCenteredModal(props) {
    const MyComponent = props.component
    const [emails, setEmails] = useState([])
    const [value, setValue] = useState("")
    const [error, setError] = useState(null)
    const clubname = props.clubname
    const username = props.username
    const clublink = props.clublink
    const inviteRoute=props.inviteRoute
    const mailText=props.mailText
    const BaseURL = process.env.REACT_APP_API_URL;
    const handleKeyDown = (e) => {
        if (['Enter', 'Tab', 'Spacebar', ','].includes(e.key)) {
            e.preventDefault();

            var email = value.trim();
            if (email && isValid(email)) {

                setEmails((oldData) => [...oldData, email])
                setValue('')
                setError('')
            }
        }
    }
    const handleDelete = (toBeRemove) => {

        setEmails(emails.filter(email => email !== toBeRemove))
    }

    const isValid = (email) => {
        var error = null;

        if (!isEmail(email)) {
            error = `${email} is not a valid email address.`;
        }

        if (isInList(email)) {
            error = `${email} has already been added.`;
        }

        if (error) {
            setError(error);

            return false;
        }

        return true;
    }

    const isEmail = (email) => {
        return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
    }
    const isInList = (email) => {
        return emails.includes(email);
    }


    const sendEmail = async (Email) => {
        await axios.post(`${BaseURL}/nodemailer/${inviteRoute}`, {
            body: JSON.stringify({
                To: Email,
                subject: mailText,
                text: mailText,
                clublink: clublink,
                username: username,
                clubname: clubname
            }),
        }).then((response) => {

            toast.success(response.data.message);


        }).then(() => {
            if (emails.length - 1 == emails.indexOf(Email)) {
                setEmails([])
                setValue('')
                setError('')
                props.closeModal()
            }
        }).catch((err) => { console.log(err) })
    };
    const inviteHandler = () => {
        if (emails.length > 0) {
            if (value == '') {
                emails.forEach(Email => {
                    sendEmail(Email);
                })
            } else {
                sendEmail(value);
                emails.forEach(Email => {
                    sendEmail(Email);
                })

            }

        } else {
            sendEmail(value);
        }






    }

    return (
        <div onClick={() => {
            var email = value.trim();
            if (email && isValid(email)) {

                setEmails((oldData) => [...oldData, email])
                setValue('')
                setError('')
            }
        }}>
            <Modal
                {...props}

                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.title}
                    </Modal.Title>
                    {/* <FaWindowClose
                        className="FaWindowClose" 
                        style={{ color: 'red' }} 
                        onClick={() => props.closeModal()} 
                    /> */}

                    <SoapboxTooltip title="Close" placement="left">
                        <span>
                            <IoCloseCircle
                                style={{ cursor: "pointer", color: "#8249A0", fontSize: "1.7rem" }}
                                onClick={() => props.closeModal()}
                            />
                        </span>
                    </SoapboxTooltip>
                </Modal.Header>
                <Modal.Body  >
                    <h5>Please Enter Email to Invite</h5>
                    <div >
                        <div >
                            {emails.map(email =>
                                <div className="tag-item" key={email}>
                                    {email}
                                    <button type="button" className="button" onClick={() => handleDelete(email)}>
                                        &times;
                                    </button>

                                </div>)}
                        </div>
                        <input placeholder="Enter Email" className="inputscheduler" onFocus onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}></input>
                    </div>
                    {error && <p className="error">{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={inviteHandler} >Invite</Button>
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

export default MyVerticallyCenteredModal