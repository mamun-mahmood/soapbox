// removed lined from create hoot to make it normal

// const videoRef = useRef(null);
// const canvasRef = useRef(null);
// const downloadRef = useRef(null);
// const videoDownloadRef = useRef(null);

// const [hasPhoto, setHasPhoto] = useState(false);
// const [extraFeatures, setExtraFeatures] = useState(false);
// const [showRecordBtn, setShowRecordBtn] = useState(true);

// const [liveStream, setLiveStream] = useState(false);
// const [livePhoto, setLivePhoto] = useState(false);
// const [liveVideo, setLiveVideo] = useState(false);
// const [liveAudio, setLiveAudio] = useState(false);

// const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);

// const { startRecording, stopRecording, register, status } = useRecorder();

// const onDemandPhoto = () => {
//     setLiveVideo(false);
//     setLiveAudio(false);
//     if (userData.privateChannel) {
//         setPrivateCheck(true);
//         setLivePhoto(true);

//         setRecordedVideoUrl(null);

//         setLiveVideo(false);
//         setLiveAudio(false);

//         getVideo();
//         setTimeout(() => {
//             window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
//         }, 1000);
//     } else {
//         toast.info("Requires Private Club")
//     }
// }

// const onDemandVideo = () => {
//     setLivePhoto(false);
//     setLiveAudio(false);
//     if (userData.privateChannel) {
//         setPrivateCheck(true);
//         setLiveVideo(true);
//         setExtraFeatures(true);

//         setRecordedVideoUrl(null);
//         setShowRecordBtn(true);

//         setLivePhoto(false);
//         setLiveAudio(false);

//         setTimeout(() => {
//             window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
//         }, 1000);
//     } else {
//         toast.info("Requires Private Club")
//     }
// }

// const onDemandAudio = () => {
//     setLivePhoto(false);
//     setLiveVideo(false);
//     if (userData.privateChannel) {
//         setLivePhoto(false);
//         setLiveVideo(false);
//     } else {
//         toast.info("Requires Private Club")
//     }
// }

// const getVideo = () => {
//     setExtraFeatures(true);
//     navigator.mediaDevices.getUserMedia({
//         video: {
//             width: 1920,
//             height: 1080
//         },
//         audio: false
//     }).then(stream => {
//         const video = videoRef.current;
//         video.srcObject = stream;

//         video.play();
//     }).catch(err => console.log(err))
// }

// const onVideoRecordingStop = useCallback((blob, blobUrl) => {
//     setRecordedVideoUrl(blobUrl);
//     const videoFile = new File([blob], `On Demand Video on MegaHoot Soapbox`, {
//         type: blob.type,
//     });
//     setFile(videoFile);

//     videoDownloadRef.current.href = blobUrl;
//     videoDownloadRef.current.download = `On Demand Video on MegaHoot Soapbox`;

//     setLiveStream(false);
// }, []);

// const takePhoto = () => {
//     const clickAudio = new Audio(shutterClick);
//     clickAudio.play();

//     const video = videoRef.current;
//     const canvas = canvasRef.current;

//     // Get the exact size of the video element.
//     const videoWidth = video.videoWidth;
//     const videoHeight = video.videoHeight;

//     // Set the canvas to the same dimensions as the video.
//     canvas.width = videoWidth;
//     canvas.height = videoHeight;

//     // get the context object of canvas
//     const ctx = canvas.getContext('2d');

//     // Draw the current frame from the video on the canvas.
//     ctx.drawImage(video, 0, 0, videoWidth, videoHeight);

//     canvas.toBlob(function (blob) {
//         const photoFile = new File([blob], `${userData.name}'s On Demand Photo on MegaHoot Soapbox.jpeg`, {
//             type: blob.type,
//         });

//         downloadRef.current.href = URL.createObjectURL(blob);
//         downloadRef.current.download = `${userData.name}'s On Demand Photo on MegaHoot Soapbox.jpeg`;

//         setFile(photoFile);
//     }, 'image/jpeg')

//     setHasPhoto(true);
//     setLiveStream(false);

//     setTimeout(() => {
//         const stream = video.srcObject;
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => {
//             track.stop();
//         });
//     }, 1000);
// }

// const closePhoto = () => {
//     setTimeout(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 0);

//     const video = videoRef.current;

//     if (video) {
//         const stream = video.srcObject;
//         const tracks = stream.getTracks();
//         tracks.forEach((track) => {
//             track.stop();
//         });
//     }

//     if (hasPhoto) {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }

//     setFile([]);
//     setPrivateCheck(false);
//     setExtraFeatures(false);
//     setHasPhoto(false);
//     setLiveStream(false);
//     setLivePhoto(false);
//     setLiveVideo(false);
//     setLiveAudio(false);
// }

// const closeVideo = () => {
//     setTimeout(() => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     }, 0);

//     setFile([]);
//     setRecordedVideoUrl(null);
//     setShowRecordBtn(true);
//     setPrivateCheck(false);
//     setExtraFeatures(false);
//     setHasPhoto(false);
//     setLiveStream(false);
//     setLivePhoto(false);
//     setLiveVideo(false);
//     setLiveAudio(false);
// }

// const reTakePhoto = () => {
//     setRecordedVideoUrl(null);
//     setExtraFeatures(true);
//     setHasPhoto(false);
//     getVideo();
// }

// const reTakeVideo = () => {
//     setRecordedVideoUrl(null);
//     setExtraFeatures(true);
//     setShowRecordBtn(true);
//     setLiveStream(false);
//     stopRecording();
// }

// const recordVideo = () => {
//     setLiveStream(true);
//     setRecordedVideoUrl(null);
//     if (status !== "recording") {
//         startRecording();
//     }
//     setShowRecordBtn(false);
// }t

// <div className="extra-media-preview">
//                                 {/* for on demand photo  */}
//                                 <canvas
//                                     onContextMenu={(e) => e.preventDefault()}
//                                     className="hoot-extra-features"
//                                     ref={canvasRef}
//                                     style={{ display: hasPhoto ? "" : "none" }}
//                                 ></canvas>

//                                 {/* for on demand photo  */}
//                                 <div
//                                     onContextMenu={(e) => e.preventDefault()}
//                                     className="click-on-demand-photo"
//                                     style={{ display: hasPhoto ? "" : "none" }}
//                                 >
//                                     Clicked
//                                 </div>

//                                 {/* for on demand photo  */}
//                                 <video
//                                     ref={videoRef}
//                                     className="hoot-extra-features"
//                                     style={{ display: hasPhoto || liveVideo ? "none" : "" }}
//                                 ></video>

//                                 {/* for on demand video */}
//                                 <video
//                                     ref={liveVideo ? register : null}
//                                     autoPlay
//                                     muted
//                                     playsInline
//                                     className="hoot-extra-features"
//                                     style={{ display: liveVideo && recordedVideoUrl === null ? "" : "none" }}
//                                 ></video>

//                                 {/* recorded vedio  */}
//                                 <video
//                                     src={recordedVideoUrl}
//                                     controls
//                                     className="hoot-extra-features"
//                                     style={{ display: liveVideo && recordedVideoUrl !== null ? "" : "none" }}
//                                 ></video>

//                                 {/* if stream is on */}
//                                 {liveStream &&
//                                     <IoRadioButtonOn
//                                         onContextMenu={(e) => e.preventDefault()}
//                                         className="live-on-demand-video"
//                                         style={{ display: status === "recording" ? "" : "none" }}
//                                     />
//                                 }
//                             </div>

// {userData.privateChannel
//     ?
//     <div className="extra-features">
//         <SoapboxTooltip title="Photo" placement="right">
//             <div className="extra-outer" onClick={onDemandPhoto}>
//                 <FiCamera className="extra-fi" />
//             </div>
//         </SoapboxTooltip>

//         <SoapboxTooltip title="Video" placement="right">
//             <div className="extra-outer" onClick={onDemandVideo}>
//                 <FiVideo className="extra-fi" />
//             </div>
//         </SoapboxTooltip>

//         <SoapboxTooltip title="Audio" placement="right">
//             <div className="extra-outer" onClick={onDemandAudio}>
//                 <AiOutlineAudio className="extra-fi" />
//             </div>
//         </SoapboxTooltip>
//     </div>
//     : null
// }

// {extraFeatures ?
//     <div className="extra-features-options">
//         {/* photo re take */}
//         {livePhoto && hasPhoto &&
//             <SoapboxTooltip title="Re take" placement="bottom">
//                 <button onClick={reTakePhoto} className="extra-outer">
//                     <VscDebugRestart className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* photo re take */}
//         {liveVideo && !showRecordBtn &&
//             <SoapboxTooltip title="Re take" placement="bottom">
//                 <button onClick={reTakeVideo} className="extra-outer">
//                     <VscDebugRestart className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* photo capture */}
//         {livePhoto && !hasPhoto &&
//             <SoapboxTooltip title="Capture" placement="bottom">
//                 <button onClick={takePhoto} className="extra-outer">
//                     <IoRadioButtonOn className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* start video recording */}
//         {liveVideo && showRecordBtn &&
//             <SoapboxTooltip title="Start Recording" placement="bottom">
//                 <button
//                     onClick={recordVideo}
//                     className="extra-outer"
//                 >
//                     <IoRadioButtonOn className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* stop video recording */}
//         {liveVideo && !showRecordBtn && !recordedVideoUrl &&
//             <SoapboxTooltip title="Stop Recording" placement="bottom">
//                 <button
//                     onClick={stopRecording(onVideoRecordingStop)}
//                     className="extra-outer"
//                 >
//                     <FaStopCircle className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* download photo */}
//         <a download ref={downloadRef} style={{ display: hasPhoto ? "" : "none" }}>
//             <SoapboxTooltip title="Download" placement="bottom">
//                 <button className="extra-outer">
//                     <FiDownload className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         </a>

//         {/* download video  */}
//         <a download ref={videoDownloadRef} style={{ display: recordedVideoUrl !== null ? "" : "none" }}>
//             <SoapboxTooltip title="Download" placement="bottom">
//                 <button className="extra-outer">
//                     <FiDownload className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         </a>

//         {/* close photo live stream */}
//         {livePhoto &&
//             <SoapboxTooltip title="Close" placement="bottom">
//                 <button onClick={closePhoto} className="extra-outer">
//                     <IoMdCloseCircleOutline className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//         {/* close video live stream */}
//         {liveVideo &&
//             <SoapboxTooltip title="Close" placement="bottom">
//                 <button onClick={closeVideo} className="extra-outer">
//                     <IoMdCloseCircleOutline className="extra-fi" />
//                 </button>
//             </SoapboxTooltip>
//         }

//     </div>
//     : null
// }