import axios from 'axios'
import React, { useEffect,useState } from 'react'
import moment from 'moment'
import socket, { startSocket } from "../../socketChat";
export default function InboxMessage(props) {

    const username=props.username
    const [chatData,setChatData] = useState([]);
    const [tabColor,setTabColor] = useState("")
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

    console.log(chatData.map(e=>e))  
  
  
  };
 

    useEffect(() => {
       axios.post(`${BaseURL}/upload/getChatDataPrivateinbox`,{
           to:username
       }).then((res)=>{

          setChatData(res.data)
       })
    }, [username])


    useEffect(()=>{ socket.on("receive-private-chat-soapbox", (data) => {
    
  
      if (data.to == username) {
  
        if (data.isEmoji) {
          appendPrivate(
            data.name,
            `${data.message}`,
            "left",
            `${BaseURL}/profile-pictures/${data.profilePic}`,
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
        <div style={{maxHeight:'80vh',overflowY:'auto',backgroundColor:tabColor,height:'100%'}}>
          <button className='inbox-tab' style={{backgroundColor:'blue'}} onClick={()=>{setTabColor('blue')}}>Contacts</button>
          <button  className='inbox-tab' style={{backgroundColor:'purple'}}  onClick={()=>{setTabColor('purple')}}>MyChats</button>
          <button  className='inbox-tab' style={{backgroundColor:'pink'}}  onClick={()=>{setTabColor('pink')}}>Promos</button>
          <button  className='inbox-tab' style={{backgroundColor:'green'}}  onClick={()=>{setTabColor('green')}}>Notifications</button>
         
          {chatData.length>0?chatData.map((e,index)=>(
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
                         <div className='message eclippse'> {e.chat.message}</div>
              </div>
              
          )):""}
        </div>
    )
}
