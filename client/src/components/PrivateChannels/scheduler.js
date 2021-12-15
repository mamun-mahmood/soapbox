import axios from 'axios';
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { SettingsSystemDaydream } from '@material-ui/icons';
import { FaWindowClose } from "react-icons/fa";
import { Button, ProgressBar, CloseButton, Modal } from "react-bootstrap";
import { SoapboxTooltip } from '../SoapboxTooltip';
import { IoCloseCircle } from 'react-icons/io5';
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredScheduler(props) {
    const MyComponent = props.component
    const [emails, setEmails] = useState([])
    const [value, setValue] = useState("")
    const [error, setError] = useState(null)
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [eventDesc, setEventDesc] = useState('')
    const [showPollForm, setShowPollForm] = useState(false)
    const [pollFormData, setPollFormData] = useState({ Question: '', OptionA: '', OptionB: '', OptionC: '', createdBy: '', threadId: '', pollA: 90, pollB: 50, pollC: 60 })
    const [pollFormDataQ, setPollFormDataQ] = useState("")
    const [pollFormDataOA, setPollFormDataOA] = useState("")
    const [pollFormDataOB, setPollFormDataOB] = useState("")
    const [pollFormDataOC, setPollFormDataOC] = useState("")
    const [FormEditPoll, setFormEditPoll] = useState(true)
    const clubname = props.clubname
    const username = props.username
    const fullName = props.fullName
    const clublink = props.clublink
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
        await axios.post(`${BaseURL}/nodemailer/eventHandlerClub`, {
            body: JSON.stringify({
                To: Email,
                subject: `You Have Been Invited to a Soapbox Club Event ${eventTitle}`,
                text: `You Have Been Invited to a Soapbox Club Event ${eventTitle}`,
                clublink: clublink,
                username: username,
                clubname: clubname,
                event: { eventDate: eventDate, eventTime: eventTime, eventTitle: eventTitle, eventDesc: eventDesc }

            }),
        }).then((response) => {
            storeMyEvent()
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

    const storeMyEvent = () => {
        axios.post(`${BaseURL}/upload/storeEvent`, {
            event: { eventTitle, eventDate, eventTime, emails, eventDesc },
            username: username
        }).then(res => {
            console.log(res.data)
        })
    }

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
                    {/* <CloseButton variant="white"  title='X' className='FaWindowClose' onClick={()=>props.closeModal()} /> */}
                    <button style={{ outline: 'none', border: 'none', padding: '3px', borderRadius: '3px', color: 'whitesmoke', backgroundColor: 'green' }} className="button" onClick={() => {
                        if (showPollForm) {
                            document.getElementById("showPollFormId").style.transition = "2s";
                            document.getElementById("showPollFormId").style.left = "200vw";

                            setTimeout(() => {
                                setShowPollForm(false);
                            }, 1000);
                        } else {
                            setShowPollForm(true);

                            setTimeout(() => {
                                if (document.getElementById("showPollFormId")) {
                                    document.getElementById("showPollFormId").style.transition = "1s";
                                    document.getElementById("showPollFormId").style.left = "70px";
                                }
                            }, 1);
                        }
                    }}>Create Poll</button>
                    {/* <FaWindowClose
                        className="FaWindowClose" style={{ color: 'red' }} onClick={() => props.closeModal()} /> */}

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
                    {/* <h5>Please Enter Email to Invite</h5> */}
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

                        {showPollForm
                            ? <div className="showPollForm" id="showPollFormId" style={{ top: '0px' }}>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#652C90'
                                    }}
                                >
                                    <h5>Create A Poll</h5>
                                    <FaWindowClose className="FaWindowClose" onClick={() => {
                                        if (showPollForm) {
                                            document.getElementById("showPollFormId").style.transition = "2s";
                                            document.getElementById("showPollFormId").style.left = "200vw";

                                            setTimeout(() => {
                                                setShowPollForm(false);
                                            }, 1000);
                                        } else {
                                            setShowPollForm(true);

                                            setTimeout(() => {
                                                if (document.getElementById("showPollFormId")) {
                                                    document.getElementById("showPollFormId").style.transition = "1s";
                                                    document.getElementById("showPollFormId").style.left = "70px";
                                                }
                                            }, 1);
                                        }
                                    }} /></div>
                                <div style={{
                                    padding: '33px',
                                    position: 'relative',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-evenly',
                                    backgroundColor: '#E0E0E0'
                                }}>
                                    {FormEditPoll ?
                                        <Form onSubmit={(e) => e.preventDefault()}>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Enter Question For Poll</Form.Label>
                                                <Form.Control type="text" value={pollFormDataQ}
                                                    onChange={(e) => { setPollFormDataQ(e.target.value) }} placeholder="Enter Question For Poll" />
                                            </Form.Group>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>Option A</Form.Label>
                                                <Form.Control value={pollFormDataOA} onChange={(e) => { setPollFormDataOA(e.target.value) }} placeholder="Option A" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Option B</Form.Label>
                                                <Form.Control value={pollFormDataOB} onChange={(e) => { setPollFormDataOB(e.target.value) }} placeholder="Option b" />
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Label>Option C</Form.Label>
                                                <Form.Control value={pollFormDataOC} onChange={(e) => { setPollFormDataOC(e.target.value) }} placeholder="Option c" />
                                            </Form.Group>

                                            <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => {
                                                setFormEditPoll(!FormEditPoll);
                                                setPollFormData({
                                                    Question: pollFormDataQ,
                                                    OptionA: pollFormDataOA,
                                                    OptionB: pollFormDataOB,
                                                    OptionC: pollFormDataOC,
                                                    createdBy: fullName,
                                                    threadId: uuidv4(),
                                                    pollA: 0,
                                                    pollB: 0,
                                                    pollC: 0
                                                })
                                            }} >
                                                Save
                                            </Button>
                                        </Form>
                                        : <Form onSubmit={(e) => e.preventDefault()}>
                                            <Form.Group className="mb-3" >
                                                <Form.Label>{pollFormData.Question}</Form.Label>

                                            </Form.Group>
                                            <Form.Group className="mb-3" >

                                                <Form.Check type="checkbox" label={pollFormData.OptionA} />
                                                <ProgressBar animated variant="success" now={pollFormData.pollA} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Check type="checkbox" label={pollFormData.OptionB} />
                                                <ProgressBar animated variant="info" now={pollFormData.pollB} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" >
                                                <Form.Check type="checkbox" label={pollFormData.OptionC} />
                                                <ProgressBar animated variant="warning" now={pollFormData.pollC} />
                                            </Form.Group>

                                            <Button variant="primary" onClick={() => { setFormEditPoll(!FormEditPoll) }} >
                                                Edit
                                            </Button>
                                            <Button variant="primary" type="submit" style={{ marginLeft: '5px' }} onClick={() => {
                                                props.sumitChatData({
                                                    Question: pollFormDataQ,
                                                    OptionA: pollFormDataOA,
                                                    OptionB: pollFormDataOB,
                                                    OptionC: pollFormDataOC,
                                                    createdBy: fullName,
                                                    threadId: uuidv4(),
                                                    pollA: 0,
                                                    pollB: 0,
                                                    pollC: 0
                                                });
                                                toast.success('Created Poll Successfully!')
                                                setShowPollForm(false)
                                            }}>
                                                Submit
                                            </Button>
                                        </Form>
                                    }

                                </div>
                            </div>
                            : null}
                        <input placeholder="Event Title" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className="inputscheduler" onFocus></input>

                        <textarea placeholder="Event Description(Optional)" value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} className="inputscheduler" onFocus></textarea>

                        <input placeholder="Enter Email to invite" className="inputscheduler" onFocus onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown}></input>
                        <input type="date" name='Event Date' value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="inputscheduler" />
                        <input type="time" name='Event Time' value={eventTime} onChange={(e) => setEventTime(e.target.value)} className="inputscheduler" />
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

export default MyVerticallyCenteredScheduler