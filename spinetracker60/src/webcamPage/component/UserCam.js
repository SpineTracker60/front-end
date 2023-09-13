import Webcam from "react-webcam";
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utils/utilitiesFace";
import * as util from "./utils/utilitiesFace";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints , drawSkeleton } from "./utils/utilitiesPose";

let detector;
export let firstEyeHeight = '';
export let firstFaceSize = '';
export let firstFaceDotHeight = '';
function UserCam() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = facemesh.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig = {
      runtime: "tfjs"
    };
    detector = await facemesh.createDetector(net, detectorConfig);
    setInterval(() => {
      detect(net);
    }, 10);
  };
  // load posenet
  const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution:{width:640, height:480},
      scale:0.5
    })
    setInterval(()=>{
      detect2(net);
    },100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const estimationConfig = { flipHorizontal: false };
      const faces = await detector.estimateFaces(video, estimationConfig);
      // console.log(faces);
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(faces, ctx);
      });
    }
  };
  const detect2 = async (net) =>{
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ){
    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;
    
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    const pose = await net.estimateSinglePose(video);
      // console.log(pose);
      // 왼어깨
    // console.log(pose.keypoints[5].position.y);
      // 오른어깨
    // console.log(pose.keypoints[6].position.y);

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
  }
  }
  const onClickHandler = () => { 
    console.log(util.eye_height);
    console.log(util.face_size);
    console.log(util.face_dot_height);
    firstEyeHeight = util.eye_height;
    firstFaceSize = util.face_size;
    firstFaceDotHeight = util.face_dot_height;
  }
  
  
  

  useEffect(() => {
    runFacemesh();
    runPosenet();
  }, []);

  return (
    <div className="UserCam">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480
          }}
        />
        <div>
        <button type="button" onClick={onClickHandler}>현재 시간 저장</button>
        </div>
    </div>
    
  );
}


export default UserCam;