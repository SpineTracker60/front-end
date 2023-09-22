import Webcam from "react-webcam";
import React, { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utils/utilitiesFace";
import * as util from "./utils/utilitiesFace";
import * as util2 from "./utils/utilitiesPose";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints , drawSkeleton } from "./utils/utilitiesPose";
import timeCalculator from "./utils/timeCalculator";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import style from "./UserCam.module.css"

let detector;
export let firstEyeHeight = '';
export let firstFaceSize = '';
export let firstFaceDotHeight = '';
function UserCam(props) {
  
  const [cameraState, setCameraState] = useState(false);
  
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
  
  
  const onClickStart = () => {
    const nowDay = dayjs().format("YYYY-MM-DD");
    const nowTime = dayjs().format("HH:mm:ss");
    const start = {
      "posture_tag" : "START",
      "date" : nowDay,
      "start_time" : nowTime,
      "end_time" : nowTime,
    }
    console.log(start);
    console.log(util.eye_height);
    console.log(util.face_size);
    console.log(util.face_dot_height);
    firstEyeHeight = util.eye_height;
    firstFaceSize = util.face_size;
    firstFaceDotHeight = util.face_dot_height;
    setCameraState(!cameraState);
  }
  const onClickEnd = () => {
    const nowDay = dayjs().format("YYYY-MM-DD");
    const nowTime = dayjs().format("HH:mm:ss");
    const end = {
    "posture_tag" : "END",
    "date" : nowDay,
    "start_time" : nowTime,
    "end_time" : nowTime,
  }
  console.log(end);
  util.initParam();
  util2.initParam();
  firstEyeHeight = '';
  firstFaceSize = '';
  firstFaceDotHeight = '';
  }
  
  const onClickHandler3 = () => {
    console.log("거북목" , timeCalculator(util.turtleTime));
    console.log("거북목 목록" , util.turtleList);
    console.log("잠", timeCalculator(util.sleepTime));
    console.log("수면실 목록", util.sleepList);
    console.log("누움", timeCalculator(util.leanTime));
    console.log("누운 목록", util.leanList);
    console.log("어깨", timeCalculator(util2.shoulderTime));
    console.log("어깨 목록" , util2.shoulderList);
  }
  
useEffect(() => {
    runFacemesh();
    runPosenet();

  },[cameraState]);

if (!cameraState){
  return (
    <>
      <motion.div className={style.cameraDiv}
          animate={{
            x: 0,
            y: 0,
            scale: 1.2,
            rotate: 0,
          }}>
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
          
      </motion.div>
      <div className={style.buttonDiv}>
          <button type="button" onClick={onClickStart}>시작</button>
          <button type="button" onClick={onClickEnd}>종료</button>
          <button type="button" onClick={onClickHandler3}>시간 계산</button>
      </div>
    </>
    
  );
  }else{
    return(
    <>
    
    <motion.div className={style.cameraDiv2}
          animate={{
            x: 0,
            y: 565,
            scale: 0.45,
            rotate: 0,
          }}>
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
      </motion.div>
      
      <div className={style.buttonDiv}>
          <button type="button" onClick={onClickStart}>시작</button>
          <button type="button" onClick={onClickEnd}>종료</button>
          <button type="button" onClick={onClickHandler3}>시간 계산</button>
      </div>
    </>
    )
  }
}


export default UserCam;