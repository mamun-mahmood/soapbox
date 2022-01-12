import axios from 'axios'
import React, { useEffect,useState } from 'react'

export default function InboxMessage(props) {
    const username=props.username
    const [chatData,setChatData] = useState([])
    
  const BaseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
       axios.post(`${BaseURL}/upload/getChatDataPrivateinbox`,{
           to:username
       }).then((res)=>{

          setChatData(res.data)
       })
    }, [])
    return (
        <div style={{maxHeight:'80vh',overflowY:'auto'}}>
          {chatData.length>0?chatData.map((e)=>(
              <div
              className="messageBox" onClick={()=>{props.openPrivateChatfromInbox({chatname:e.chatFrom,imgSrc:`${BaseURL}/profile-pictures/${e.chat.profilePic}`})}}>
                 
                  <div className="ProfileBox"   
                         >
                            <img
                              className="chat-profile"
                              src={`${BaseURL}/profile-pictures/${e.chat.profilePic}`}
                            />
                            <p>{e.chatFrom}</p>
                            {/* <p className="timestamp"> {e.createdAt}</p> */}
                          </div>
                         <div className='message'> {e.chat.message}</div>
              </div>
              
          )):""}
        </div>
    )
}
