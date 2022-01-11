
const io = require('socket.io-client');
// const ss =  require('socket.io-stream');
// const fs = require('fs');
// const SOCKET_URI = "https://api.fortisab.com/"
// const SOCKET_URI = "http://socketsignalapi001.amaprods.com/"
const SOCKET_URI = "https://socketapi37464cvfgfsdhfg.megahoot.net/"
//const SOCKET_URI = "http://198.245.61.114:65000/"
const socket = io(SOCKET_URI);


export function startSocket() {
    if (!socket.connected) {
        socket.connect();
    } else {
        console.log('socket connection status: ', socket.connected);
    }
}


export function stopSocket() {
    if (socket.connected) {
        socket.disconnect();
        console.log('socket connected: ', socket.connected);
    } else {
        console.log('no active socket connection found');
    }
}

export default socket;
