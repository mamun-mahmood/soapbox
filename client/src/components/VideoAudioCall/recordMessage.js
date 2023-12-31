import React, { useState, useEffect, Component } from 'react'
import socket, { startSocket } from './socket'
import kurentoUtils from "kurento-utils";
import { Call, CallEnd, Camera, CameraEnhance, CameraFront, CameraRear, Chat, ControlCamera, Group, Mic, MicOff, MoreVert, Pause, PauseCircleFilled, PauseOutlined, PersonAdd, PlayArrow, Settings, Share, VideoCall, Videocam, VideocamOff, VolumeMute } from '@material-ui/icons';
import './index.css'
import { withRouter } from "react-router";
import { v4 as uuidv4 } from "uuid";

import {VideoStreamMerger} from 'video-stream-merger'

class RecordMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { chatBox: false, camMuted: false, showControlls: true }

    }
    // getting dom elements


    componentDidMount = () => {
     
      
        var divRoomSelection = document.getElementById('roomSelection');
        var divMeetingRoom = document.getElementById('meetingRoom');
        var inputRoom = document.getElementById('room');
        var inputName = document.getElementById('name');
        var btnRegister = document.getElementById('register');
        var myarray = []
        // variables
        var roomName = this.props.match.params.hallId
        var userName = this.props.match.params.userName;
        var participants = {};

        // Let's do this
        var merger = new VideoStreamMerger();


        function submitHandler() {

            if (roomName === '' || userName === '') {
                alert('Room and Name are required!');
            } else {
                var message = {
                    event: 'joinRoom',
                    userName: userName,
                    roomName: roomName
                }
                sendMessage(message);

                if (document.getElementById('aboutus') && document.getElementById('nav-bar')) {
                    document.getElementById('aboutus').style.display = "none"
                    document.getElementById('nav-bar').style.display = "none"
                }

            }
        }

        submitHandler()

        // messages handlers
        socket.on('message', message => {
            console.log('Message received: ' + message.event);

            switch (message.event) {
                case 'newParticipantArrived':
                    receiveVideo(message.userid, message.username);
                    break;
                case 'existingParticipants':
                    onExistingParticipants(message.userid, message.existingUsers);
                    break;
                case 'receiveVideoAnswer':
                    onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
                    break;
                case 'candidate':
                    addIceCandidate(message.userid, message.candidate);
                    break;

                case 'muteMymic':
                    muteAudio(message.userid)
                    break;
                case 'unmuteMymic':
                    unmuteAudio(message.userid)
                    break;
                case 'muteMycam':
                    muteVideo(message.userid)

                    break;
                case 'unmuteMycam':
                    unmuteVideo(message.userid)
                    break;
                case 'disconnectMe':
                    disconnectMe(message.id)

            }
        });

        // handlers functions
        const dynamicVideoLayout = () => {



            myarray.forEach((userid) => {
                if (myarray.length == 1) {
                    document.getElementById(userid).style.width = `${(document.getElementById('meetingRoom').offsetHeight / 9 - 5) * 16}px`;
                    document.getElementById(userid).style.minWidth = "300px";
                    document.getElementById(userid).style.maxWidth = "90vw";
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";




                } else if (myarray.length == 2) {


                    document.getElementById(userid).style.width = "40vw";
                    document.getElementById(userid).style.minWidth = "300px"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";


                } else if (myarray.length > 2 && myarray.length <= 6) {
                    document.getElementById(userid).style.width = "300px";
                    document.getElementById(userid).style.minWidth = "30vw"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";

                } else if (myarray.length > 6) {
                    document.getElementById(userid).style.width = "300px";
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";


                }

            });

        };
        function receiveVideo(userid, username) {
            myarray = [...myarray, userid];
            var video = document.createElement('video');
            var div = document.createElement('div');
            div.className = "videoContainer";
            div.id = userid + "div";
            var name = document.createElement('div');
            video.id = userid;
            video.autoplay = true;

            name.appendChild(document.createTextNode(username));
            div.appendChild(video);
            div.appendChild(name);
            divMeetingRoom.appendChild(div);

            var user = {
                id: userid,
                username: username,
                video: video,
                rtcPeer: null
            }

            participants[user.id] = user;

            var options = {
                remoteVideo: video,
                onicecandidate: onIceCandidate
            }

            user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
                function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    this.generateOffer(onOffer);
                }
            );

            var onOffer = function (err, offer, wp) {
                console.log('sending offer');
                var message = {
                    event: 'receiveVideoFrom',
                    userid: user.id,
                    roomName: roomName,
                    sdpOffer: offer
                }
                sendMessage(message);
            }

            function onIceCandidate(candidate, wp) {
                console.log('sending ice candidates');
                var message = {
                    event: 'candidate',
                    userid: user.id,
                    roomName: roomName,
                    candidate: candidate
                }
                sendMessage(message);
            }

            dynamicVideoLayout(userid)
        }

        function onExistingParticipants(userid, existingUsers) {
            myarray = [...myarray, userid];
            var video = document.createElement('video');
            var div = document.createElement('div');
            div.className = "videoContainer";
            div.id = userid + "div";
            var name = document.createElement('div');
            video.id = userid;
            video.className = "meetingRoom-video-attendee"
            video.autoplay = true;
            name.appendChild(document.createTextNode(userName));
            div.appendChild(video);
            div.appendChild(name);
            divMeetingRoom.appendChild(div);

            var user = {
                id: userid,
                username: userName,
                video: video,
                rtcPeer: null
            }

            participants[user.id] = user;

            var constraints = {
                audio: true,
                video: {
                    frameRate: {
                        min: 1,
                        ideal: 15,
                        max: 30,
                    },
                    width: {
                        min: 320,
                        ideal: 1280,
                        max: 1280,
                    },
                    height: {
                        min: 180,
                        ideal: 720,
                        max: 720,
                    },
                    aspectRatio: 1.78,

                }
            };

            var options = {
                localVideo: video,
                mediaConstraints: constraints,
                onicecandidate: onIceCandidate
            }



            user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
                function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    this.generateOffer(onOffer)
                }
            );

            existingUsers.forEach(function (element) {
                receiveVideo(element.id, element.name);
            });

            var onOffer = function (err, offer, wp) {
                console.log('sending offer');
                var message = {
                    event: 'receiveVideoFrom',
                    userid: user.id,
                    roomName: roomName,
                    sdpOffer: offer
                }
                sendMessage(message);
            }

            function onIceCandidate(candidate, wp) {
                console.log('sending ice candidates');
                var message = {
                    event: 'candidate',
                    userid: user.id,
                    roomName: roomName,
                    candidate: candidate
                }
                sendMessage(message);
            }
            dynamicVideoLayout(userid)
        }
     
        function onReceiveVideoAnswer(senderid, sdpAnswer) {
            participants[senderid].rtcPeer.processAnswer(sdpAnswer);
        }

        function addIceCandidate(userid, candidate) {
            participants[userid].rtcPeer.addIceCandidate(candidate);
        }

        // utilities
        function sendMessage(message) {
            console.log('sending ' + message.event + ' message to server');
            socket.emit('message', message);
        }

        document.getElementById('hangup').onclick = () => {
            Stop()


        }
        const Stop=()=> {
            if (participants[myarray[0]] && participants[myarray[0]].rtcPeer) {

                dispose(myarray[0]);
                sendMessage({ id: myarray[0], event: 'disconnectMe', roomName: roomName, userName: userName })
            }
           
        }

        const dispose=(id)=> {

            if (participants[id]&& participants[id].rtcPeer) {
                participants[id].rtcPeer.dispose();
                participants[id].rtcPeer = null;
                window.location.href = "/";
                // this.props.history.goBack();
            }
           
        }


        const disconnectMe = (id) => {

            document.getElementById(id + "div").remove();

            myarray.splice(myarray.indexOf(id), 1);
            dynamicVideoLayout()
        }

        document.getElementById('mic').onclick = () => {



            const mediaStream = document.getElementById(myarray[0]).srcObject;
            const AudioTracks = mediaStream.getAudioTracks();
            if (this.state.micMuted) {
                let Message = { event: 'unmuteMymic', userid: myarray[0], roomName: roomName }
                sendMessage(Message)
                AudioTracks.forEach((track) => (track.enabled = true))
            } else {
                let Message = { event: 'muteMymic', userid: myarray[0], roomName: roomName }
                sendMessage(Message)
                AudioTracks.forEach((track) => (track.enabled = false))
            }
        }

        document.getElementById('cam').onclick = () => {

            const mediaStream = document.getElementById(myarray[0]).srcObject;
            const videoTracks = mediaStream.getVideoTracks();
            if (this.state.camMuted) {
                this.setState({ camMuted: !this.state.camMuted })
                let Message = { event: 'unmuteMycam', userid: myarray[0], roomName: roomName }
                sendMessage(Message)
                videoTracks.forEach((track) => (track.enabled = true))

            } else {
                this.setState({ camMuted: !this.state.camMuted })
                let Message = { event: 'muteMycam', userid: myarray[0], roomName: roomName }
                sendMessage(Message)
                videoTracks.forEach((track) => (track.enabled = false))
            }
        }




        const muteAudio = (id) => {

            const mediaStream = document.getElementById(id).srcObject;
            const AudioTracks = mediaStream.getAudioTracks();
            AudioTracks.forEach((track) => (track.enabled = false))
            if (myarray[0] == id) {
                document.getElementById('mic').style.color = "red"
            }
        }
        const unmuteAudio = (id) => {

            const mediaStream = document.getElementById(id).srcObject;
            const AudioTracks = mediaStream.getAudioTracks();
            AudioTracks.forEach((track) => (track.enabled = true))
            if (myarray[0] == id) {
                document.getElementById('mic').style.color = "grey"
            }
        }


        const muteVideo = (id) => {
            const mediaStream = document.getElementById(id).srcObject;
            const videoTracks = mediaStream.getVideoTracks();
            videoTracks.forEach((track) => (track.enabled = false))
            if (myarray[0] == id) {
                document.getElementById('cam').style.color = "red"
            }

        }
        const unmuteVideo = (id) => {
            const mediaStream = document.getElementById(id).srcObject;
            const videoTracks = mediaStream.getVideoTracks();
            videoTracks.forEach((track) => (track.enabled = true))
            if (myarray[0] == id) {
                document.getElementById('cam').style.color = "grey"
            }
        }

        window.onbeforeunload = () => {
            Stop()

            //  window.setTimeout(()=> { 
            //   this.props.history.push("/error");
            // },1000); 
            window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
        }

        let recordingTimeMS = 3 * 600000;
        var stopcount = 0;
    
        const startRecording = (stream, lengthInMS) => {
            let recorder = new MediaRecorder(stream);
            let data = [];
      
            recorder.ondataavailable = (event) => data.push(event.data);
            recorder.start();
           
            let stopped = new Promise((resolve, reject) => {
              recorder.onstop = resolve;
              recorder.onerror = (event) => reject(event.name);
            });
            let killrecord = new Promise((resolve, reject) => {
                document.getElementById('stopRecord').onclick = resolve;
              recorder.onerror = (event) => reject(event.name);
            });
              document.getElementById('stopRecord').onclick=()=>{
                  recorder.stop()
              }
            return Promise.all([stopped, killrecord]).then(() => data);
          };


        //   document.getElementById('startRecord').onclick=()=>{
        //       var downloadButton=document.getElementById('download')
        //        startRecording(document.getElementById(myarray[0].srcObject), recordingTimeMS)
        //   .then((recordedChunks) => {
        //     let recordedBlob = new Blob(recordedChunks, {
        //       mimeType: "video/webm",
        //     });
          
        //     downloadButton.href = URL.createObjectURL(recordedBlob);
        //     downloadButton.title = uuidv4() + ".webm";
        //     downloadButton.download = uuidv4() + ".webm";

        //   })
        //   .catch(console.log("err"));
        //   }
         
          document.getElementById('startRecord').addEventListener(
            "click",
            () => {
      
      
              merger.addStream(document.getElementById(myarray[0]).srcObject, {
                x: 60, // position of the topleft corner
                y: 40,
                width: 580,
                height: 320,
                mute: false,
                draw: (ctx, frame, done) => {
                  // You can do whatever you want with this canvas context
      
                //   let imgrc = document.getElementById("recordBanner");
                //   let blackbgs = document.getElementById("blackbg");
                //   ctx.globalAlpha = 1;
                //   ctx.drawImage(blackbgs, 0, 0, 1280, 720);
                  ctx.drawImage(frame, 320, 150, 640, 480);
      
                  done();
                },
                // we don't want sound from the screen (if there is any)
              });
      
              merger.setOutputSize(1280, 720);
              merger.start();
      
              // We now have a merged MediaStream!
              if (merger.result) {
                startRecording(merger.result, recordingTimeMS)
                  .then((recordedChunks) => {
                    var downloadButton=document.getElementById('download')
                    let recordedBlob = new Blob(recordedChunks, {
                      mimeType: "video/webm",
                    });
                  
                    downloadButton.href = URL.createObjectURL(recordedBlob);
                    downloadButton.title = uuidv4() + ".webm";
                    downloadButton.download = uuidv4()  + ".webm";
      
                   
                  })
                  .catch((err)=>console.log('err',err));
              }
            },
            false
          );

    }



    render() {
        return (

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                <div id="meetingRoomHeader" onMouseEnter={() => { this.setState({ showControlls: false }) }} ><h3>{`Soapbox Live Experience`}</h3><h5>{"POWERED BY VEROHIVE"}</h5></div>
                <div id="meetingRoom"    ></div>
                <div id="controlls"  >

                    <li id="hangup"><CallEnd /></li>
                    <li id="mic" onClick={() => {
                        this.setState({ micMuted: !this.state.micMuted })


                    }}>{this.state.micMuted ? <MicOff style={{ color: 'red' }} /> : <Mic />}</li>


                    <li id="cam" onClick={() => {



                    }}>{this.state.camMuted ? <VideocamOff style={{ color: 'red' }} /> : <Videocam />}</li>
                    {/* <li><MicOff /></li> */}
                    {/* <li onClick={() => { this.setState({ chatBox: !this.state.chatBox }) }}><Chat /></li> */}
                    {/* <li><Group /></li> */}
                    <li id="startRecord"><PlayArrow  /></li>
                    <li id="stopRecord"><PauseOutlined /></li>

                    <a id="download"><Share /></a>
                    <li><MoreVert /></li>
                </div>



            </div>



        )
    }

}

export default withRouter(RecordMessage)
