import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import sendIcon from "../../assets/send.png";
import { SettingsSystemDaydream } from '@material-ui/icons';
import { FaWindowClose } from "react-icons/fa";
import { Button, ProgressBar, CloseButton, Modal } from "react-bootstrap";
import { SoapboxTooltip } from '../SoapboxTooltip';
import { IoCloseCircle } from 'react-icons/io5';
import Form from "react-bootstrap/Form";
import BeatLoader from "react-spinners/BeatLoader";
function ReplyModal(props) {
    const threadId=props.data.chatData.threadId
    const BaseURL = process.env.REACT_APP_API_URL;
   const [replyInput,setReplyInput]=useState('')
   const [allReply,setAllReply]= useState([])
   const [loading,setLoading]= useState(true)

   useEffect(() => {
    axios.post(`${BaseURL}/upload/get-reply`,{
      threadId:threadId
    }).then(res=>{
     res.data.forEach(e=>{
      setAllReply(oldData=>[...oldData,e])
     })
     
        setLoading(false)
    }).catch((err)=>{console.log(err);setLoading(false)})
   }, [])
  const submitHandler=(replyInput)=>{
      if(replyInput!==''){
           let today = new Date();

    let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
    setAllReply(oldData=>[...oldData,{username:props.data.user.name,profilePic:props.data.user.profilePic,reply:replyInput,timestamp:timestamp}])
    axios.post(`${BaseURL}/upload/add-reply`,{
      threadId:threadId,
       reply:JSON.stringify({username:props.data.user.name,profilePic:props.data.user.profilePic,reply:replyInput,timestamp:timestamp})
    }).then((res)=>{console.log('success');
  props.sendReplyToChat({chatname:props.data.user.name,
    profilePic:props.data.user.profilePic,
    reply:replyInput,
    timestamp:timestamp,
    parentChat:props.data.chatData,
    replyCount:allReply.length

  })
  })
    .catch((err)=>{console.log(err)})
    
    
    setReplyInput('')
    // setTimeout(() => {
    //     let replyContainer = document.querySelector(".reply-body");
    //     replyContainer.scrollTop = replyContainer.scrollHeight;
    // }, 100);

   
    

      }
   
  }

  useEffect(() => {
      if(document.querySelector(".reply-body")){
          let replyContainer = document.querySelector(".reply-body");
    replyContainer.scrollTop = replyContainer.scrollHeight;  
      }
  
  }, [allReply])
    return (
        props.data?<div>
            <Modal
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter" style={{fontSize:'15px'}}>
                    {`Reply ${props.data.chatData.chatname}`}
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
                  {/* {props.data.chatData.threadId} */}
                    <div className='reply-body' >
                    {loading
                        ? <BeatLoader color={"#8249A0"} size={18} />
                        :null
                    }
                           {allReply.length>0?
             allReply.map((e)=><div
                className="messageBox"
               
             
              >
                <div className="ProfileBox"   >
                  <img
                    className="chat-profile"
                    src={e.profilePic? `${BaseURL}/profile-pictures/${e.profilePic}`: null}
                  />
                  <p>{e.username}</p>
                  <p className="timestamp"> {e.timestamp}</p>
                </div>
                {e.reply}
                </div>
             )
             :null}
             {(allReply.length==0 && loading==false)?<p>Wow!!,You are first to reply on this chat </p>:null}
             </div>
             
        
             
                </Modal.Body>
                <Modal.Footer>
                    <form style={{width:'100%'}} onSubmit={(e)=>{e.preventDefault(); submitHandler(replyInput)}}>     <input placeholder='Enter Your Reply' value={replyInput} onChange={(e)=>{setReplyInput(e.target.value)}} className='messageInputBox'></input>
                 <button
                 type='submit'
                
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
                          </button></form>
           
                </Modal.Footer>
            </Modal>
        </div>:""
        
    );
}

export default ReplyModal