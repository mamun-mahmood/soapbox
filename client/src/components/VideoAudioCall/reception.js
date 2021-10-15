import React,{useEffect, useState} from "react";
import { useHistory } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useParams } from 'react-router-dom';
import socket, { startSocket } from './socket'
export default function Reception(props) {
    const userInformation = JSON.parse(localStorage.getItem("loggedIn"));
  var userName = userInformation.username;
  const { hallId } = useParams()
  const myUserId=uuidv4()
  const history = useHistory();
const [hostArrived,sethostArrived]=useState(false)

  // Put variables in global scope to make them available to the browser console.
const constraints = window.constraints = {
    audio: false,
    video: {
        width: 1280,
        
        Height: 720,
       
        
    }

  };

  socket.on('message', message => {
    console.log('Message received: ' + message.event);

    switch (message.event) {
        
        case 'hostArrived':
            if(message.userid==myUserId){
                sethostArrived(true)
            }
          
            break;
         case 'comeInRoom':
            socket.to(message.roomName).emit('message',message)
            break;
           

    }
});
  
  function handleSuccess(stream) {
    const video = document.querySelector('video');
    const videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log(`Using video device: ${videoTracks[0].label}`);
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
    video.play()
  }
  
  function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
      errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg(`getUserMedia error: ${error.name}`, error);
  }
  
  function errorMsg(msg, error) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
  
  async function init() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
     
    } catch (e) {
      handleError(e);
    }
  }

  function sendMessage(message) {
    console.log('sending ' + message.event + ' message to server');
    socket.emit('message', message);
}


const informHost=()=>{
    var message = {
        event: 'imInWaitingRoom',
        userid:myUserId,
        roomName: hallId,
        username: userName
    }
    sendMessage(message);
}

  useEffect(() => {
    
    init()
    informHost()
  }, [])
  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',backgroundColor:'#D6C7D7',minHeight:'100vh'}} >
 <div id="meetingRoomHeader"><h4>{`SOAPBOX VIRTUAL EXPERIENCE`}</h4><h5>{"POWERED BY VEROHIVE"}</h5></div>
 
        {/* <div >

        Reception
      <h1>{hallId}</h1>
      <h1>{userName}</h1>
      <button
       className="d-grid col-12 btn-main login-form-button"
       variant="primary"
     
        onClick={() => {
        
          history.push({
            pathname: `/${uuidv4()}/SoapboxHall/${uuidv4()}`,
            state: {
              host: false,
              userName:userName,
              hallId: hallId,
            },
          });
        }}
      >
        Join Meeting
      </button>
        </div> */}
        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',justifyContent:'space-evenly',alignItems:'center'}}>
        {/* <div id="errorMsg"></div> */}
        <img src={"https://soapboxapi.megahoot.net/profile-pictures/soapbox_Twittercar1.png"} style={{width:'90%',minWidth:'300px',flex:1}} />
       <video style={{width:'90%',minWidth:'300px',flex:1}} ></video>

        </div>
        {hostArrived? <h3 style={{color:'green'}} >Host has Arrived</h3>: <h3 style={{color:'red'}}>Waiting For Host</h3>}
  
   
 <div id="controlls"><h4>{`SOAPBOX VIRTUAL EXPERIENCE`}</h4><h5>{"POWERED BY VEROHIVE"}</h5></div>
    </div>
  );
}
