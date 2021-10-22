// var getVideoStream = () => {


//     setExtraFeatures(true);
//     navigator.mediaDevices.getUserMedia({
//         video: {
//             width: 1920,
//             height: 1080
//         },
//         audio: true
//     }).then(stream => {
//         const video = videoRef.current;
//         video.srcObject = stream;

//         video.play();
//         setTimeout(() => {
//             setLiveStream(true);
//         }, 200);

        // let mediaRecorder;
    // const recordedChunks = []; // Media data in chunks
    // mediaRecorder = new MediaRecorder(stream);

    // if (startVideoRecording === true) {
    //     mediaRecorder.ondataavailable = handleDataAvailable;
    //     mediaRecorder.start();

    //     console.log("started recording...");

    //     const handleDataAvailable = (event) => {
    //         if (event.data.size > 0) {
    //             recordedChunks.push(event.data);
    //         }
    //     }

    //     setShowRecordBtn(false);
    // }

    // if (startVideoRecording === false) {
    //     mediaRecorder.stop();
    //     console.log("stopped recording...");

    //     const videoBlob = new Blob(recordedChunks, {
    //         type: "video/webm"
    //     });

    //     const videoFile = new File([videoBlob], `${userName}'s On Demand Video on MegaHoot Soapbox.jpeg`, {
    //         type: videoBlob.type,
    //     });
    //     setFile(videoFile);

    //     videoDownloadRef.current.href = URL.createObjectURL(videoBlob);
    //     videoDownloadRef.current.download = `${userName}'s On Demand Video on MegaHoot Soapbox.jpeg`;

    //     setLiveStream(false);
    //     setHasVideo(true);

    //     const video = videoRef.current;
    //     setTimeout(() => {
    //         const stream = video.srcObject;
    //         const tracks = stream.getTracks();
    //         tracks.forEach((track) => {
    //             track.stop();
    //         });
    //     }, 1000);
    // }

//     }).catch(err => console.log(err))
// }

// var startRecordingVideo = () => {
//     setStartVideoRecording(true);
//     setLiveStream(true);

//         mediaRecorder.start();

// }

// var stopRecordingVideo = () => {
//     setStartVideoRecording(false);
//     setLiveStream(false);
// }
