import React, { useState, useEffect, Component } from 'react'
import socket, { startSocket } from './socket'
import kurentoUtils from "kurento-utils";
import { Call, CallEnd, Camera, CameraEnhance, CameraFront, CameraRear, Chat, ControlCamera, Group, Mic, MicOff, MoreVert, Pause, PauseCircleFilled, PauseOutlined, PersonAdd, PlayArrow, Settings, Share, VideoCall, Videocam, VideocamOff, VolumeMute } from '@material-ui/icons';
import './index.css'
import { withRouter } from "react-router";
import { v4 as uuidv4 } from "uuid";

import { VideoStreamMerger } from 'video-stream-merger'

class VideoChat extends Component {
    constructor(props) {
        super(props);
        this.state = { chatBox: false, camMuted: false, showControlls: true }

    }
    // getting dom elements


    componentDidMount = () => {

        var divRoomSelection = document.getElementById('roomSelection');
        var divMeetingRoom = document.getElementById('meetingRoomDiv');
        var inputRoom = document.getElementById('room');
        var inputName = document.getElementById('name');
        var btnRegister = document.getElementById('register');
        var myarray = []
        // variables
        var roomName = this.props.host
        var userName = this.props.userName;
        var host = this.props.host
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

                    document.getElementById(userid).style.width = "30vw";
                    document.getElementById(userid).style.minWidth = "450px"
                    document.getElementById(userid).style.maxHeight = `${(document.getElementById(userid).offsetWidth / 16) * 9}px`;
                    document.getElementById(userid).style.objectFit = "cover";
                    this.props.videoAvailable()
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
            if (username == host) {
                myarray = [...myarray, userid];
                var video = document.createElement('video');
                var div = document.createElement('div');
                div.className = "videoContainer";
                div.id = userid + "div";
                var name = document.createElement('div');
                video.id = userid;
                video.autoplay = true;
                video.style.width = "100%"
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

        }

        function onExistingParticipants(userid, existingUsers) {
            if (host == userName) {
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
                video.style.width = "100%"
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
            } else {
                existingUsers.forEach(function (element) {
                    receiveVideo(element.id, element.name);
                });
            }

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
                if (document.getElementById(myarray[0] + "div")) {
                    document.getElementById(myarray[0] + "div").remove();
                    document.getElementById("controll").remove()

                }

                // this.props.history.goBack();
            }

        }


        const disconnectMe = (id) => {
            if (document.getElementById(id + "div")) {
                document.getElementById(id + "div").remove();

                myarray.splice(myarray.indexOf(id), 1);
                dynamicVideoLayout()
            }

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



    render() {
        return (

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column', position: 'fixed' }}>

                <div id="meetingRoomDiv"    ></div>

                <div id="controll" style={{ display: this.props.userName == this.props.host ? "flex" : "none", position: 'absolute', top: '1px', left: '0px', flexDirection: 'column', maxWidth: '50px !important', maxHeight: '180px', backgroundColor: '#662d9117', borderRadius: '2rem' }}  >

                    <li id="hangup"><CallEnd style={{ size: '20px' }} /></li>
                    <li id="mic" onClick={() => {
                        this.setState({ micMuted: !this.state.micMuted })


                    }}>{this.state.micMuted ? <MicOff style={{ color: 'red', size: '20px' }} /> : <Mic />}</li>


                    <li id="cam" onClick={() => {



                    }}>{this.state.camMuted ? <VideocamOff style={{ color: 'red', size: '20px' }} /> : <Videocam />}</li>

                </div>




            </div>



        )
    }

}

export default withRouter(VideoChat)
