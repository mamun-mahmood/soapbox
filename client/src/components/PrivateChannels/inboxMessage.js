import axios from 'axios'
import React, { useEffect,useState } from 'react'
import moment from 'moment'
import socket, { startSocket } from "../../socketChat";
import {AiOutlineBell} from 'react-icons/ai'
import { Contacts } from '@material-ui/icons';
import inviteicon from "../../assets/inviteicon.png";
import { SoapboxTooltip } from "../SoapboxTooltip";
export default function InboxMessage(props) {

    const username=props.username;
    const actualUsername=props.actualUsername
    const [chatData,setChatData] = useState([]);
    const [contacts,setContacts] = useState([]);
    const [tabColor,setTabColor] = useState("purple");
    const [showNotification,setShowNotification] = useState(false)
    const [showContacts,setShowContacts] = useState(false)
    const [showPromos,setShowPromos] = useState(false)
    const [showMyChat,setShowMyChat] = useState(true)
  const BaseURL = process.env.REACT_APP_API_URL;
  const appendPrivate = (
    chatFrom,
    message,
    position,
    imgSrc,
    isEmoji,
    isVideo,
    isImage
  ) => {
    let chat={message:message,profilePic:imgSrc}
   
  

    setChatData((e) => [
    ...e,
      { chatFrom, chat, position, imgSrc, isEmoji, isVideo, isImage },
    ]);

    
  
  
  };
 
      useEffect(()=>{
       for(let i=0;i<chatData.length;i++){
   let data= chatData.find(e=>e.chatFrom==chatData[i].chatFrom && chatData.indexOf(e)!==chatData.indexOf(chatData[i]))

  if(data){
     setChatData(chatData.filter(e=>e!==data).reverse())   
  }
  }

      },[chatData])
    useEffect(() => {
       axios.post(`${BaseURL}/upload/getChatDataPrivateinbox`,{
           to:username
       }).then((res)=>{

        setChatData(res.data)
       });


    }, [username])

    useEffect(() => {
      axios.get(`${BaseURL}/user/follows/${actualUsername}`).then((res)=>{
         res.data.forEach(e=>{
           axios.get(`${BaseURL}/user/${e.username}`).then(response=>{
setContacts(old=>[...old,response.data])
           })
         })
         
      });

      
   }, [username])


    useEffect(()=>{ socket.on("receive-private-chat-soapbox", (data) => {
    
  
      if (data.to == username) {
  
        if (data.isEmoji) {
          appendPrivate(
            data.name,
            `${data.message}`,
            "left",
            data.profilePic,
            data.isEmoji
          );
        } else {
          appendPrivate(
            data.name,
            data.message,
            "left",
            data.profilePic,
            data.isEmoji,
            data.isVideo,
            data.isImage,
            data.timeStamp
          );
        
         
        }
      }
  
    })},[])
    return (
        <div style={{maxHeight:'80vh',overflowY:'auto',backgroundColor:tabColor,height:'100%'}}   
        onDragStart={(e) => e.preventDefault()}
        onmousedown={(event) => {
          event.preventDefault
            ? event.preventDefault()
            : (event.returnValue = false);
        }} >
          <button className='inbox-tab' style={{backgroundColor:'blue'}} onClick={()=>{setTabColor('blue');setShowContacts(true);setShowMyChat(false);setShowPromos(false);setShowNotification(false)}}>Contacts</button>
          <button  className='inbox-tab' style={{backgroundColor:'purple'}}  onClick={()=>{setTabColor('purple');setShowContacts(false);setShowMyChat(true);setShowPromos(false);setShowNotification(false)}}>MyChats</button>
          <button  className='inbox-tab' style={{backgroundColor:'pink'}}  onClick={()=>{setTabColor('pink');setShowContacts(false);setShowMyChat(false);setShowPromos(true);setShowNotification(false)}}>Promos</button>
          <button  className='inbox-tab' style={{backgroundColor:'green',width:'30px'}}  onClick={()=>{setTabColor('green');setShowContacts(false);setShowMyChat(false);setShowPromos(false);setShowNotification(true)}}><AiOutlineBell /></button>
          <span style={{cursor:'pointer'}} onClick={() => props.setInviteBox(true)}>
                    <SoapboxTooltip title={"Invite"} placement="bottom" privateTooltip={true}>
                      <img src={inviteicon} width="30px" />
                    </SoapboxTooltip>
                  </span>
         {showContacts?
         <div>{contacts.length>0?contacts.map((e,index)=>(
          <div key={index}
          className="messageBox" onClick={()=>{props.openPrivateChatfromInbox({chatname:e[0].name,imgSrc:`${BaseURL}/profile-pictures/${e[0].profilePic}`})}}>
             
              <div className="ProfileBox"   
                     >
                        <img
                          className="chat-profile"
                          src={`${BaseURL}/profile-pictures/${e[0].profilePic}`}
                        />
                        <p>{e[0].name}</p>
                        {/* <p className="timestamp"> {moment(e.createdAt).fromNow()}</p> */}
                      </div>
                     <div className='message'> {e[0].email}</div>
          </div>
          
      )):""}</div>:null}
         {showMyChat?<div>{chatData.length>0?chatData.map((e,index)=>(
              <div key={index}
              className="messageBox" onClick={()=>{props.openPrivateChatfromInbox({chatname:e.chatFrom,imgSrc:`${BaseURL}/profile-pictures/${e.chat.profilePic}`})}}>
                 
                  <div className="ProfileBox"   
                         >
                            <img
                              className="chat-profile"
                              src={`${BaseURL}/profile-pictures/${e.chat.profilePic}`}
                            />
                            <p>{e.chatFrom}</p>
                            <p className="timestamp"> {moment(e.createdAt).fromNow()}</p>
                          </div>
                          {e.chat.isImage ||e.isImage?<img style={{marginLeft:'37px',marginTop:'-15px',width:'18px'}} src={e.chat.message}  />:null}
                          {e.chat.isVideo || e.isVideo?<video style={{marginLeft:'37px',marginTop:'-15px',width:'18px'}} src={e.chat.message}  />:null}
                        {(!e.chat.isImage &&!e.isImage&&!e.isVideo && !e.chat.isVideo)?<div className='message eclippse'> {e.chat.message}</div>:null} 
                        
              </div>
              
          )):""}</div>:null}
          {showNotification?<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'whitesmoke'}}>No Notifications</div>:null}
          {showPromos?<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'whitesmoke'}}>No Promotion Available</div>:null}
          
        </div>
    )
}
