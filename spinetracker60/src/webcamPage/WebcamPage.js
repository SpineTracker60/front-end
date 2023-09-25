import { useEffect, useRef, useState } from "react";
import UserCam from "./component/UserCam";
import style from "./WebcamPage.module.css"
import { motion } from "framer-motion";
import "../css/common.css";
import { useNavigate } from "react-router-dom";
// import ChatBot from "./component/utils/ChatBot";
import axios from "axios";
import { API_BASE_URL_SOCKET2 } from "../constants";
import NoticeBoard from "./component/NoticeBoard/NoticeBoard";
import Chart from "./component/Chart/Chart";
import UserInfo from "./component/UserInfo/UserInfo";
import ChatBotModal from "./component/ChatBotModal/ChatBotModal";
import { io } from "socket.io-client";

import { roomJoin } from "./component/utils/ChatBot";
// import Alarm from "../firebase-messaging-sw";
// import { getToken } from 'firebase/messaging';
// const ogs = require('open-graph-scraper');



function WebcamPage(props){
    

    const navigate = useNavigate();

    const [noticeBoardModal, setNoticeBoardModal] = useState(false);
    const [chartModal, setChartModal] = useState(false);
    const [userInfoModal, setUserInfoModal] = useState(false);
    const [writingModalWrapper, setWritingModalWrapper] = useState(false);
    const [chatBotModal, setChatBotModal] = useState(false);
    const [importLink, setImportLink] = useState('');
    const [chatList, setChatList] = useState([]);


    

    const variants = {
        open: { opacity : 1 , x: 0},
        closed: {opacity : 0, x: "-100%"},
    }
    const variants2 = {
        open: { opacity : 1 , y: 0},
        closed: { opacity : 0, y: "100%"},
    }
    
    useEffect(() => {
    if(!props.authenticated){
        
        navigate('/');
    }
    // const token = await getToken(messaging, {
    //     vapidKey: process.env.REACT_APP_VAPID_KEY,
    //   });
      
    },[])
    
    
    const noticeBoardModalHandler = () => {
        setChartModal(false);
        setUserInfoModal(false);
        setNoticeBoardModal(!noticeBoardModal);
        
    }
    const chartModalHandler = () => {
        setNoticeBoardModal(false);
        setUserInfoModal(false);
        setChartModal(!chartModal);
    }
    const userInfoModalHandler = () => {
        setNoticeBoardModal(false);
        setChartModal(false);
        setUserInfoModal(!userInfoModal);
    }
    const writingModalHandler = () => {
        setWritingModalWrapper(!writingModalWrapper);
    }
    const chatBotModalHandler = () => {
        setChatBotModal(!chatBotModal);
    }
    
    const linkOnchangeHandler = (e) => {
        setImportLink(e.target.value);
    }
    
    const linkOnClickHandler = () => {
        fetchData(importLink);
        console.log(importLink);
    }

    async function fetchData(url){
        try{
            console.log(url);
            var res1 = encodeURI(url);
        const response = await fetch(`https://opengraph.io/api/1.1/site/${res1}?app_id=18bc489b-2d31-4c86-9692-b11a65785bf9`);
        //https://opengraph.io/api/1.1/site/<URL encoded site URL>?app_id=xxxxxx
        const data = await response.json();
        console.log(data);
        }catch (error){
            console.error(error);

        }

         
        
    }
    




    if(props.authenticated){
    
    const userImgUrl = props.user.profileImage;
    const userName = props.user.name;

    let socket;



    const ENDPOINT = API_BASE_URL_SOCKET2;
    
    
    socket = io(`${ENDPOINT}/room`, {
      transports: ["websocket"]
    });

    socket.connect();

    socket.on("join", (chat) => {
      console.log("성공");
    });

    socket.on("chat", (chat) => {
        console.log(chat.body);
        console.log(chat.answer);
        
        setChatList([...chatList, chat]);
        //botChat.push(chat);
        
}

    );
    roomJoin(props.user.id, socket);    

    // ChatBot(props);
    // Alarm();

    // if(true){
    //     const userImgUrl = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt58ef7034e07c73bc/62cdb7613745b748b33a95b2/GettyImages-1358485714.jpg?auto=webp&format=pjpg&width=1080&quality=60"
    //     const userName = "호날두"
    
    

    return(
        <>  
            <div className={style.sideDiv}>
                <motion.div className={style.sideBarDiv}>
                    <div className={style.userInfoDiv}>
                        <img src={userImgUrl} className={style.userImg} alt="사진"/>
                        <p className={style.userName}>{userName}님</p>
                    </div>
                    <div className={style.noticeBoardBtnDiv}>
                        <motion.button type="button" className={style.noticeBoardBtn} onClick={noticeBoardModalHandler}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/noticeBoard.png" className={style.noticeBoardImg}/>
                            제품 추천 게시판</motion.button>
                    </div>
                    <div className={style.chartBtnDiv}>        
                        <motion.button type="button" className={style.chartBtn} onClick={chartModalHandler}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/chart.png" className={style.chartImg}/>
                            대시보드</motion.button>
                    </div>
                    <div className={style.userInfoBtnDiv}>
                        <motion.button type="button" className={style.userInfoBtn} onClick={userInfoModalHandler}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/userInfo.png" className={style.userInfoImg}/>
                            마이페이지</motion.button>
                    </div>
                    
                    <div className={style.logoutBtnDiv}>
                        <motion.button type="button" onClick={props.onLogout} className={style.logoutBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/logout.png" className={style.logoutImg}/>
                            로그아웃</motion.button>
                    </div>
                </motion.div>
                <motion.nav 
                animate={noticeBoardModal ? "open" : "closed"}
                variants={variants}
                className={noticeBoardModal ? style.noticeBoardModal : style.none}>
                        <NoticeBoard writingModalWrapper ={writingModalWrapper} setWritingModalWrapper = {setWritingModalWrapper}/>
                </motion.nav>
                <motion.nav 
                animate={chartModal ? "open" : "closed"}
                variants={variants}           
                className={chartModal ? style.chartModal : style.none}>
                        <Chart/>
                </motion.nav>
                <motion.nav 
                animate={userInfoModal ? "open" : "closed"}
                variants={variants} 
                className={userInfoModal ? style.userInfoModal : style.none}>
                        <UserInfo/>
                </motion.nav>
            </div>
            <div className={style.mainContents}>
                <UserCam authenticated={props.authenticated} className={style.mainContents}/>
                <motion.nav 
                animate={chatBotModal ? "open" : "closed"}
                variants={variants2}
                className={chatBotModal ? style.chatBotModal : style.none}>
                    <ChatBotModal authenticated={props.authenticated} user={props.user} chatList={chatList}/>   
                </motion.nav>
                <motion.button type="button" className={style.chatBotBtn} name="chatBotBtn" onClick={chatBotModalHandler}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    >
                        <img src="/img/chatBot.png" alt="챗봇"/>
                </motion.button>
            </div>
            <div className={writingModalWrapper ? style.writingModalWrapper : style.none}>
                <motion.nav 
                    animate={writingModalWrapper ? "open" : "closed"}
                    variants={variants}
                    className={style.writingModal}
                >   
                    <div className={style.modalUserInfoDiv}>
                        <img src={userImgUrl} className={style.modalUserImg} alt="사진"/>
                        <p className={style.modalUserName}>{userName}님의 추천</p>
                        <motion.button type="botton" className={style.modalXBtn} onClick={writingModalHandler}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/X.png"/>
                        
                        </motion.button>
                    </div>
                        <div>
                            <input type="text" className={style.coupangLink} placeholder="제품 링크를 입력해주세요." onChange={linkOnchangeHandler}/>
                        </div>
                        <div>
                            <textarea type="text" className={style.writePost} placeholder="내용을 입력해주세요." maxLength="160"/>
                        </div> 
                        <div className={style.linkArea}>
                            
                        </div>
                        <div>
                            <button type="button" className={style.submitBtn} onClick={linkOnClickHandler}>
                                작성 완료
                            </button>
                    </div>
                </motion.nav>
            </div>
        </>
    )
    }
}



export default WebcamPage;