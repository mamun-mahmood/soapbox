import axios from 'axios'
import React, { useEffect,useState,Fragment } from 'react'
import moment from 'moment'
import socket, { startSocket } from "../../socketChat";
import {AiOutlineBell} from 'react-icons/ai'
import { Contacts } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar'
import NavBar from '../../components/NavBar/NavBar'
import { SoapboxTooltip } from "../SoapboxTooltip";
import sendIcon from "../../assets/send.png";
import videochat from "../../assets/videochat.png";
import imagechat from "../../assets/imagechat.png";
import emojiIcon from "../../assets/emoji.png";
import stickerIcon from '../../assets/stickerIcon.png'
import filechat from "../../assets/filechat.png";
import { FaRegTrashAlt, FaTumblr, FaWindowClose } from "react-icons/fa";
import Picker from "emoji-picker-react";
import Linkify from "react-linkify";
import ReactTooltip from "react-tooltip";
import { v4 as uuidv4 } from "uuid";
export default function InboxMessagePublic(props) {
  const stickersImages = ["https://soapboxapi.megahoot.net/stickers/sticker1.png",
  "https://soapboxapi.megahoot.net/stickers/sticker2.png",
  "https://soapboxapi.megahoot.net/stickers/sticker3.png",
  "https://soapboxapi.megahoot.net/stickers/sticker4.png",
  "https://soapboxapi.megahoot.net/stickers/sticker5.png",
  "https://soapboxapi.megahoot.net/stickers/sticker6.png",
  "https://soapboxapi.megahoot.net/stickers/sticker7.png",
  "https://soapboxapi.megahoot.net/stickers/sticker8.png",
  "https://soapboxapi.megahoot.net/stickers/sticker9.png",
  "https://soapboxapi.megahoot.net/stickers/sticker10.png",
  "https://soapboxapi.megahoot.net/stickers/sticker11.png",
  "https://soapboxapi.megahoot.net/stickers/sticker12.png",
  "https://soapboxapi.megahoot.net/stickers/sticker13.png",
  "https://soapboxapi.megahoot.net/stickers/sticker14.png",
]
    const { actualUsername } = useParams();
    const [chatDataPrivate, setChatDataPrivate] = useState([]);
    const [userProfilePic, setUserProfilePic] = useState("");
    const [chatData,setChatData] = useState([]);
    const [contacts,setContacts] = useState([]);
    const [username,setUsername] = useState('')
    const [tabColor,setTabColor] = useState("purple");
    const [showNotification,setShowNotification] = useState(false)
    const [showContacts,setShowContacts] = useState(false)
    const [showPromos,setShowPromos] = useState(false)
    const [showMyChat,setShowMyChat] = useState(true)
    const [privateChat, setPrivateChat] = useState(false);
    const [messageInboxValuePrivate, setMessageInboxValuePrivate] = useState("");
    const [privateChatPerson, setPrivateChatPerson] = useState([]);
    const [stickerPicker, setStickerPicker] = useState(false);
  const BaseURL = process.env.REACT_APP_API_URL;

  const getChatDataPrivate = (a, b) => {
    setChatDataPrivate([]);
    axios
      .post(`${BaseURL}/upload/getChatDataPrivate`, {
        to: a,
        from: b
      })
      .then((res) => {

        res.data.forEach((i) => {
          let chatname = i.chat.name,
            message = i.chat.message,
            position = i.chat.position,
            imgSrc = `${BaseURL}/profile-pictures/${i.chat.profilePic}`,
            isEmoji = i.chat.isEmoji,
            isVideo = i.chat.isVideo,
            isImage = i.chat.isImage,
            timestamp = i.chat.timestamp,
            isSticker=i.chat.isSticker
          setChatDataPrivate((e) => [
            ...e,
            { chatname, message, position, imgSrc, isEmoji, isVideo, isImage, timestamp,isSticker },
          ]);
        });
        setTimeout(() => {
          if (document.querySelector(".privateChat-club")) {
            var messageContainer = document.querySelector(".privateChat-club");

            messageContainer.scrollTop = messageContainer.scrollHeight;
          }
        }, 1000);

      });
  };
 const openPrivateChat=(e)=>{
  getChatDataPrivate(e.chatname, username)
  setPrivateChatPerson({
    name: e.chatname,
    profilePic: e.imgSrc,
  });
 
  setPrivateChat(true);
  setTimeout(() => {
    if (
      document.getElementById(
        "privatechatslide"
      )
    ) {
      document.getElementById(
        "privatechatslide"
      ).style.transition = "1sec";
      document.getElementById(
        "privatechatslide"
      ).style.right = "0px";
      document.getElementById(
        "privatechatslide"
      ).style.left = "0px";
    }
  }, 1);
 };
 const appendPrivate = (
  chatname,
  message,
  position,
  imgSrc,
  isEmoji,
  isVideo,
  isImage,
  isSticker
) => {
  
  setChatDataPrivate((e) => [
    ...e,
    { chatname, message, position, imgSrc, isEmoji, isVideo, isImage,isSticker },
  ]);

  
  if(document.querySelector(".privateChat-club")){
    var messageContainer = document.querySelector(".privateChat-club");
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
 
};
function isEmoji(str) {
  var ranges = [
    "(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])", // U+1F680 to U+1F6FF
  ];

  if (str.match(ranges.join("|"))) {
    return true;
  } else {
    return false;
  }
}
 const messagesubmitPrivate = (e) => {

  e.preventDefault();
  if (messageInboxValuePrivate) {
    const message = messageInboxValuePrivate;
    let today = new Date();
let threadId = uuidv4()
    let timestamp = today.toLocaleTimeString() + " " + today.toLocaleDateString()
    let emojiValidator = isEmoji(message);

    appendPrivate(
      username,
      `${message}`,
      "right",
      `${BaseURL}/profile-pictures/${userProfilePic}`,
      emojiValidator
    );
    // socket.emit('send',message);
    socket.emit("private-message-soapbox", {
      threadId:threadId,
      to: privateChatPerson.name,
      from: username,
      isClub: 0,
      isPrivate: 1,
      isCommunity: 0,
      name: username,
      message: message,
      profilePic: userProfilePic,
      isEmoji: isEmoji(message),
      timestamp: timestamp
    });
    setMessageInboxValuePrivate("");
  }
};
  useEffect(()=>{
    axios
    .get(`${BaseURL}/user/${actualUsername}`)
    .then(res=>{ setUsername(res.data[0].name); setUserProfilePic(res.data[0].profilePic);})
    .catch(err=>console.log(err))
  },[])

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

      
   }, [])


    useEffect(()=>{ 
    //   socket.on("receive-private-chat-soapbox", (data) => {
    
  
    //   if (data.to == username) {
  
    //     if (data.isEmoji) {
    //       appendPrivate(
    //         data.name,
    //         `${data.message}`,
    //         "left",
    //         `${BaseURL}/profile-pictures/${data.profilePic}`,
    //         data.isEmoji
    //       );
    //     } else {
    //       appendPrivate(
    //         data.name,
    //         data.message,
    //         "left",
    //         data.profilePic,
    //         data.isEmoji,
    //         data.isVideo,
    //         data.isImage,
    //         data.timeStamp
    //       );
        
         
    //     }
    //   }
  
    // })

    socket.on("receive-private-chat-soapbox", (data) => {

      // if(data.to == username){
      
      //  setChatUnview(chatUnview+1)
      // }
   if ((data.to == username) &&( data.from == privateChatPerson ? privateChatPerson.name : username)) {
     
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
         `${data.message}`,
         "left",
         `${BaseURL}/profile-pictures/${data.profilePic}`,
         data.isEmoji,
         data.isVideo,
         data.isImage,
         data.timeStamp
       );
     }
   }

 });
  
  },[])
    return (


        <Fragment >
        <NavBar />
        <div className="main-body" onContextMenu={(e) => e.preventDefault()} onDrag={(e) => e.preventDefault()}>
            <SideBar />
            {privateChat?<div style={{width:'100%',position:'relative'}}><button onClick={()=>setPrivateChat(false)}>Close</button>
            <div className="privateChat-club" id="privatechatslide" style={{position:'absolute',top:'70px',height:'82vh'}}>
                    <div
                      className="live-header"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        position:'absolute',
                        backgroundColor: "#8149a06c",
                        color: "white",
                        borderRadius: "3px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                     
                        top:'73px'
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {privateChatPerson && privateChatPerson.profilePic ? (
                          <img
                            src={privateChatPerson.profilePic}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderRadius: "15px",
                            }}
                          />
                        )
                          : null
                        }

                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "0.93rem",
                            marginTop: "12px",
                          }}
                        >
                          {privateChatPerson.name}
                        </p>
                      </span>

                      <span style={{ display: 'flex', alignItems: 'center' }}>
                       
                        Private Chat
                        <FaWindowClose
                          className="icon-text"
                          onClick={() => {
                            document.getElementById(
                              "privatechatslide"
                            ).style.transition = "2sec";
                            document.getElementById(
                              "privatechatslide"
                            ).style.right = "-100vw";

                            setTimeout(() => {
                              setPrivateChat(false);
                              // setClubFloor(true);
                              // setShowChatRoom(true)
                            }, 200);
                          }}
                        />
                      </span>
                    </div>
                    <div
                      className="chatarea"
                      style={{
                        marginTop:"0px",
                        zIndex: "-1",
                      }}
                    >
                      {chatDataPrivate.length
                        ? chatDataPrivate.map((e) => (
                          <div
                            className="messageBox"
                            style={{
                              maxWidth:
                                e.isVideo || e.isImage ? "200px" : "100%",
                            }}

                          >
                            <div className="ProfileBox">
                              <img
                                className="chat-profile"
                                src={e.imgSrc ? e.imgSrc : null}
                              />
                              <p>{e.chatname}</p>
                              <p className="timestamp"> {e.timestamp}</p>
                            </div>
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <a
                                  target="blank"
                                  href={decoratedHref}
                                  key={key}
                                >
                                  {decoratedText}
                                </a>
                              )}
                            >
                              {" "}
                              <div
                                className={
                                  e.isEmoji ? "message-emoji" : "message"
                                }
                              >
                                {!e.isVideo && !e.isImage && !e.isPoll && !e.isEvent ? e.message : null}
                              </div>
                            </Linkify>
                          
                         
                            {e.isVideo ? (
                              <video
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                                controls={true}
                                src={e.message}
                              ></video>
                            ) : null}
                            {e.isImage ? (
                              <img
                              
                                src={e.message}
                                onDragStart={(e) => e.preventDefault()}
                                onmousedown={(event) => {
                                  event.preventDefault
                                    ? event.preventDefault()
                                    : (event.returnValue = false);
                                }}
                                style={{
                                  maxWidth: e.isSticker ? "60px" : "200px",
                                  marginTop: "20px",
                                  borderRadius: "5px",
                                }}
                              />
                            ) : null}

                            {e.isPoll ? <p style={{ fontSize: '12px' }}>{`Voting Ends in ${e.expiryTime}`}</p> : null}
                            {/* {e.message || e.isEmoji || e.isVideo || e.isImage ? <button 
                              className="reply-button" 
                              onClick={()=>{
                                setReplyData({chatData:e,user:{
                                name: userFullName,
                                profilePic: userProfilePic,
                              }});setShowReply(!showReply)}}>{showReply?"Reply":"Reply"}</button> : null} */}
                            <div className="reply-box"></div>
                          </div>
                        ))
                        : null}

                      {/* {emojiPickerPrivate && (
                        <ClickAwayListener
                          onClickAway={() => {
                            setEmojiPickerPrivate(false);
                          }}
                        >
                          <div>
                            <Picker
                              native
                              onEmojiClick={(event, emojiObject) => {
                                setMessageInboxValuePrivate(
                                  messageInboxValuePrivate + emojiObject.emoji
                                );
                                // append(userFullName,`${emojiObject.emoji}`, 'right', `${BaseURL}/profile-pictures/${userProfilePic}`, true)
                                //  // socket.emit('send',message);
                                // socket.emit('send', {
                                //     name: userFullName,
                                //     message: emojiObject.emoji,
                                //     profilePic: userProfilePic,
                                //     isEmoji: true
                                // });
                              }}
                              pickerStyle={{
                                position: "absolute",
                                bottom: "0px",
                                left: "0.2rem",
                                zIndex: "1111",
                              }}
                            />
                          </div>
                        </ClickAwayListener>
                      )} */}
                       {stickerPicker ? <div style={{
                        position: "sticky",
                        bottom: "0px",
                        left: "0.5rem",
                        backgroundColor: '#652C90',
                        borderRadius: '5px',
                        padding: '8px',
                        zIndex: "1111", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap'
                      }}>
                        {stickersImages.map((image) => <img src={image}
                          onClick={() => {

                            appendPrivate(
                              username,
                              `${image}`,
                              "left",
                              `${BaseURL}/profile-pictures/${userProfilePic}`,
                              false,
                              false,
                              true,true
                            );
                            socket.emit("send", {
                              name: username,
                              message: `${image}`,
                              profilePic: userProfilePic,
                              isEmoji: false,
                              isVideo: false,
                              isImage: true,
                              isSticker: true
                            });
                            setStickerPicker(false)
                          }}
                          style={{ width: '70px', minWidth: '70px', minHeight: '70px', margin: '5px', cursor: 'pointer', backgroundColor: 'whitesmoke', padding: '5px' }} />)}
                      </div> : null
                      }
                       
                    </div>
                   
                    <div className="send-private">
                      <ReactTooltip />
                      <form
                        action="#"
                        id="send-container"
                        style={{ marginLeft: privateChat ? "5px" : "5px" }}
                         onSubmit={(e) => messagesubmitPrivate(e)}
                      >
                        <label htmlFor="post-video">
                          <SoapboxTooltip title={"Share Video"} placement="top">
                            <img
                              src={videochat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                        </label>
                        <input
                          type="file"
                          id="post-video"
                          name="video"
                          accept="video/*"
                          // onChange={handleFile}
                          hidden
                          disabled={true}
                        />

                        <label htmlFor="post-image">
                          <SoapboxTooltip title={"Share Photos"} placement="top">
                            <img
                              src={imagechat}
                              style={{ margin: "5px", cursor: "pointer" }}
                              width="27px"
                            />
                          </SoapboxTooltip>
                        </label>
                        <input
                          type="file"
                          id="post-image"
                          name="image"
                          accept="image/*"
                          // onChange={handleFile}
                          hidden
                          disabled={true}
                        />

                        <SoapboxTooltip title={"Share File"} placement="top">
                          <img
                            src={filechat}
                            style={{ margin: "5px", cursor: "pointer" }}
                            width="27px"
                          />
                        </SoapboxTooltip>
                        <SoapboxTooltip title={"Stickers"} placement="top">
                          <img
                            src={stickerIcon}
                            style={{ width: '25px', padding: '3px', borderRadius: '15px', margin: "5px", cursor: "pointer", backgroundColor: '#8249A0' }}
                             onClick={() => {
                               setStickerPicker(!stickerPicker);
                            }}
                          />
                        </SoapboxTooltip>

                        <SoapboxTooltip title={"Emoji"} placement="top">
                          <img
                            src={emojiIcon}
                            style={{ margin: "5px", cursor: "pointer" }}
                            // onClick={() => {
                            //   setEmojiPickerPrivate(!emojiPickerPrivate);
                            // }}
                            width="27px"
                          />
                        </SoapboxTooltip>

                        <input
                          type="text"
                          name="messageInp"
                           value={messageInboxValuePrivate}
                          autoComplete="off"
                          id="messageInp"
                          style={{ width: privateChat ? "230px" : "230px" }}
                           onChange={(e) => {
                             setMessageInboxValuePrivate(e.target.value);
                          }}
                        />

                        <button
                          type="submit"
                          style={{
                            border: "none",
                            outline: "none",
                            background: "none",
                            marginLeft: "5px",
                          }}
                        >
                          <SoapboxTooltip title={"Send Message"} placement="top">
                            <img src={sendIcon} width="27px" />
                          </SoapboxTooltip>
                        </button>
                      </form>
                    </div>
                  </div>
            </div>:
               <div style={{marginTop:'70px',minWidth:'60%',minHeight:'90vh',maxHeight:'90vh',overflowY:'auto',backgroundColor:tabColor,height:'100%',padding:'1rem'}}>
          <button className='inbox-tab' style={{backgroundColor:'blue',width:'25%'}} onClick={()=>{setTabColor('blue');setShowContacts(true);setShowMyChat(false);setShowPromos(false);setShowNotification(false)}}>Contacts</button>
          <button  className='inbox-tab' style={{backgroundColor:'purple',width:'25%'}}  onClick={()=>{setTabColor('purple');setShowContacts(false);setShowMyChat(true);setShowPromos(false);setShowNotification(false)}}>MyChats</button>
          <button  className='inbox-tab' style={{backgroundColor:'pink',width:'25%'}}  onClick={()=>{setTabColor('pink');setShowContacts(false);setShowMyChat(false);setShowPromos(true);setShowNotification(false)}}>Promos</button>
          <button  className='inbox-tab' style={{backgroundColor:'green',width:'30px'}}  onClick={()=>{setTabColor('green');setShowContacts(false);setShowMyChat(false);setShowPromos(false);setShowNotification(true)}}><AiOutlineBell /></button>
         
         {showContacts?
         <div>{contacts.length>0?contacts.map((e,index)=>(
          <div key={index}
          className="messageBox" 
         onClick={()=>{openPrivateChat({chatname:e[0].name,imgSrc:`${BaseURL}/profile-pictures/${e[0].profilePic}`})}}
          
          >
             
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
              className="messageBox" 
          onClick={()=>{openPrivateChat({chatname:e.chatFrom,imgSrc:`${BaseURL}/profile-pictures/${e.chat.profilePic}`})}}
              
              >
                 
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
              
          )):""}</div>:null}
          {showNotification?<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'whitesmoke'}}>No Notifications</div>:null}
          {showPromos?<div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'whitesmoke'}}>No Promotion Available</div>:null}
        
        </div>}
     
     
        </div>
        </Fragment>
    )
}
