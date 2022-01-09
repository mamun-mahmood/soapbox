import axios from 'axios';
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import sendIcon from "../../assets/send.png";
import { SettingsSystemDaydream } from '@material-ui/icons';
import { FaWindowClose } from "react-icons/fa";
import { Button, ProgressBar, CloseButton, Modal } from "react-bootstrap";
import { SoapboxTooltip } from '../SoapboxTooltip';
import { IoCloseCircle } from 'react-icons/io5';
import Form from "react-bootstrap/Form";

function ReplyModal(props) {
  
   

    return (
        <div>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:'15px'}}>
                    {`Reply ${props.data.chatname}`}
                    </Modal.Title>
                
                   

                    <SoapboxTooltip title="Close" placement="left">
                        <span>
                            <IoCloseCircle
                                style={{ cursor: "pointer", color: "#8249A0", fontSize: "1.7rem" }}
                                onClick={() => props.onHide()}
                            />
                        </span>
                    </SoapboxTooltip>

                </Modal.Header>
                <Modal.Body  >
             <p>Wow!!,You are first to reply on this chat </p>
                </Modal.Body>
                <Modal.Footer>
                <input placeholder='Enter Your Reply' className='messageInputBox'></input> <button
                            type="submit"
                            style={{
                              border: "none",
                              outline: "none",
                              background: "none",
                              marginLeft: "5px",
                            }}
                          >
                            <SoapboxTooltip title={"Send Reply"} placement="top" >
                              <img src={sendIcon} width="27px" />
                            </SoapboxTooltip>
                          </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ReplyModal