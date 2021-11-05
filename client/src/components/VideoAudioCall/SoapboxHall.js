import React, { useState, useEffect, Component } from 'react'
import socket, { startSocket } from './socket'
import kurentoUtils from "kurento-utils";
import frame from '../../assets/frame.png';
import bgRoom from '../../assets/roombg.png';
import { Call, CallEnd, Camera, CameraEnhance, CameraFront, CameraRear, Chat, ControlCamera, Group, Mic, MicOff, MoreVert, PersonAdd, Settings, VideoCall, Videocam, VideocamOff, VolumeMute } from '@material-ui/icons';
import './index.css'
import { withRouter } from "react-router";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
class SoapboxHall extends Component {
    constructor(props) {
        super(props);
        this.state = { chatBox: false, camMuted: false, showControlls: true, maxVideoStreamName: '', waiters: [] }

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
        var roomName = this.props.location.state.hallId
        var userName = this.props.location.state.userName;
        var participants = {};

        // Let's do this



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
                    break;
                case 'imInWaitingRoom':
                    if (this.props.location.state.host) {
                        var Message = {
                            event: 'hostArrived',
                            userid: message.userid,
                            roomName: roomName,
                        }
                        sendMessage(Message);
                        if (!this.state.waiters.includes(message)) {
                            this.setState({
                                waiters: [...this.state.waiters, message],

                            });

                        }

                    }


            }
        });

        // handlers functions
        const dynamicVideoLayout = () => {



            myarray.forEach((userid) => {
                if (myarray.length == 1) {
                    document.getElementById(userid).style.width = `300px`;
                    document.getElementById(userid).style.minWidth = "300px";
                    document.getElementById(userid).style.maxWidth = "90vw";
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";
                    document.getElementById(userid + "div").style.marginTop = "60px"



                } else if (myarray.length == 2) {


                    document.getElementById(userid).style.width = "300px";
                    document.getElementById(userid).style.minWidth = "300px"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";

                    if (myarray.indexOf(userid) == 0) {
                        document.getElementById(userid + "div").style.marginTop = "60px";
                    } else {
                        document.getElementById(userid + "div").style.marginTop = "20px";
                    }

                } else if (myarray.length > 2 && myarray.length <= 6) {

                    document.getElementById(userid).style.width = "250px";
                    document.getElementById(userid).style.minWidth = "250px"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";
                    if (myarray.indexOf(userid) == 0) {
                        document.getElementById(userid + "div").style.marginTop = "10px";
                    } else {
                        document.getElementById(userid + "div").style.marginTop = "10px";
                    }

                } else if (myarray.length > 6) {

                    document.getElementById(userid).style.width = "300px";
                    document.getElementById(userid).style.minWidth = "300px"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";


                }

            });

        };
        const receiveVideo = (userid, username) => {
            myarray = [...myarray, userid];
            var video = document.createElement('video');
            var div = document.createElement('div');
            div.className = "videoContainer";
            div.id = userid + "div";
            var name = document.createElement('div');
            video.id = userid;
            name.style.width = "100%";
            name.style.backgroundColor = '#7C0099';
            video.autoplay = true;
            video.onclick = () => {
                this.setState({ maxVideoStreamName: username })
                document.getElementById("maxVideoStream").srcObject = video.srcObject;
                document.getElementById("maxVideoStream").autoplay = true;

                document.getElementById("maxVideoStream").style.width = "100%";
                document.getElementById("maxVideoStream").style.minWidth = "300px"
                document.getElementById("maxVideoStream").style.maxHeight = `${(document.getElementById("maxVideoStream").offsetWidth / 16) * 9}px`;
                document.getElementById("maxVideoStream").style.objectFit = "cover";
            }
            video.style.cursor = "pointer"
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

        const onExistingParticipants = (userid, existingUsers) => {
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
            name.style.width = "100%";
            name.style.backgroundColor = '#7C0099';
            div.appendChild(video);
            div.appendChild(name);
            divMeetingRoom.appendChild(div);
            video.style.cursor = "pointer"
            video.onclick = () => {
                this.setState({ maxVideoStreamName: userName })
                document.getElementById("maxVideoStream").srcObject = video.srcObject;
                document.getElementById("maxVideoStream").autoplay = true;

                document.getElementById("maxVideoStream").style.width = "100%";
                document.getElementById("maxVideoStream").style.minWidth = "300px"
                document.getElementById("maxVideoStream").style.maxHeight = `${(document.getElementById("maxVideoStream").offsetWidth / 16) * 9}px`;
                document.getElementById("maxVideoStream").style.objectFit = "cover";

            }
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
        const Stop = () => {
            if (participants[myarray[0]] && participants[myarray[0]].rtcPeer) {

                dispose(myarray[0]);
                sendMessage({ id: myarray[0], event: 'disconnectMe', roomName: roomName, userName: userName })
            }

        }

        const dispose = (id) => {

            if (participants[id] && participants[id].rtcPeer) {
                participants[id].rtcPeer.dispose();
                participants[id].rtcPeer = null;
                if (this.props.location.state.host) {
                    const { history } = this.props;
                    if (history) {
                        history.push(`/${uuidv4()}/private/Club/${this.props.location.state.hostUserName}/${uuidv4()}`);
                        window.location.reload()
                    }
                } else {
                    window.location.href = "/";
                }

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

    }

    inviteHandler = () => {
        var email = prompt('email');

        const BaseURL = process.env.REACT_APP_API_URL;
        const sendEmail = async () => {
            await axios.post(`${BaseURL}/nodemailer/inviteHandler`, {
                body: JSON.stringify({
                    To: email,
                    subject: "Soapbox Virtual Experience Invite",
                    text: "Please join the meeting ",
                    link: `https://megahoot.net/${uuidv4()}/Reception/${this.props.location.state.hallId}/${uuidv4()}`,
                }),
            }).then((response) => {
                alert(response.data.message);
            }).catch((err) => { console.log(err) })
        };

        sendEmail();
    }

    render() {
        return (

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', minHeight: '100vh', background: `url(${bgRoom})` }} id="mainRoom">
                <div id="meetingRoomHeader" onMouseEnter={() => { this.setState({ showControlls: false }) }} ><h4>{`SOAPBOX VIRTUAL EXPERIENCE`}</h4><h5>{"POWERED BY VEROHIVE"}</h5></div>

                <div style={{ display: 'flex', flexDirection: 'row', position: 'fixed', top: '48px', width: '100vw' }}>
                    <div id="meetingRoom"    >
                        <div className="wrapper-container">{this.state.waiters.map((waiter) => (
                            <div
                                key={waiter.userid}
                                className="wrapper"

                            >
                                {waiter.username} is in reception area
                            </div>
                        ))}</div>

                    </div>
                    <div style={{ flex: 3, position: 'relative', left: '-50px' }} >
                        <video id="maxVideoStream" style={{ zIndex: 1, position: 'absolute' }} width="100%" controlls  ></video>
                        <img style={{ width: '100%', height: "100%", zIndex: 2, position: 'absolute' }} src={frame} />
                        <h5 style={{ width: '100%', height: "100%", zIndex: 3, position: 'absolute', top: "93%", textAlign: 'center', fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold' }} >{this.state.maxVideoStreamName}</h5>

                    </div>

                </div>
                <div id="controlls"  >

                    <li id="hangup"><CallEnd /></li>
                    <li id="mic" onClick={() => {
                        this.setState({ micMuted: !this.state.micMuted })


                    }}>{this.state.micMuted ? <MicOff style={{ color: 'red' }} /> : <Mic />}</li>


                    <li id="cam" onClick={() => {



                    }}>{this.state.camMuted ? <VideocamOff style={{ color: 'red' }} /> : <Videocam />}</li>
                    {/* <li><MicOff /></li> */}
                    {/* <li onClick={() => { this.setState({ chatBox: !this.state.chatBox }) }}><Chat /></li>
                    <li><Group /></li> */}
                    <li onClick={() => { this.inviteHandler() }} ><PersonAdd /></li>
                    <li><MoreVert /></li>
                </div>



            </div>



        )
    }

}

export default withRouter(SoapboxHall)
