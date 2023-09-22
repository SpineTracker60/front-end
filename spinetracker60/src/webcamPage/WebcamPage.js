import { useEffect, useRef, useState } from "react";
import UserCam from "./component/UserCam";
import style from "./WebcamPage.module.css"
import { motion } from "framer-motion";
import "../css/common.css";
import { useNavigate } from "react-router-dom";
import ChatBot from "./component/utils/ChatBot";
import axios from "axios";
import { API_BASE_URL_SOCKET } from "../constants";
import NoticeBoard from "./component/NoticeBoard/NoticeBoard";
import Chart from "./component/Chart/Chart";
import UserInfo from "./component/UserInfo/UserInfo";

function WebcamPage(props){
    const chat = useRef(null);

    const navigate = useNavigate();

    const [noticeBoardModal, setNoticeBoardModal] = useState(false);
    const [chartModal, setChartModal] = useState(false);
    const [userInfoModal, setUserInfoModal] = useState(false);
    
    // useEffect(() => {
    // if(!props.authenticated){
    //     navigate('/');
    // }
    // },[])
    
    const submitChat = () => {
        axios.post(API_BASE_URL_SOCKET + '/chat?memberId='+ props.user.id,
        {
            "chat" : chat.current.value,
            "chatTag" : "chat"
        });
        chat.current.value = '';
    }
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


    // if(props.authenticated){
    
    // const userImgUrl = props.user.profileImage;
    // const userName = props.user.name;

    // ChatBot(props);

    if(true){
        const userImgUrl = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt58ef7034e07c73bc/62cdb7613745b748b33a95b2/GettyImages-1358485714.jpg?auto=webp&format=pjpg&width=1080&quality=60"
        const userName = "호날두"
        
    return(
        <>  
            <div className={style.sideDiv}>
                <motion.div className={style.sideBarDiv}>
                    <div className={style.userInfoDiv}>
                        <img src={userImgUrl} className={style.userImg}/>
                        <p className={style.userName}>{userName}님</p>
                    </div>
                    <div className={style.noticeBoardBtnDiv}>
                        <motion.button type="button" className={style.noticeBoardBtn} onClick={noticeBoardModalHandler}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/noticeBoard.png" className={style.noticeBoardImg}/>
                            게시판</motion.button>
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
                        {/* <form>
                            <input type="text" ref={chat}></input>
                            <button type="button" onClick={submitChat}>채팅 보내기</button>
                        </form> */}
                    
                    <div className={style.logoutBtnDiv}>
                        <motion.button type="button" onClick={props.onLogout} className={style.logoutBtn}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        >
                            <img src="/img/logout.png" className={style.logoutImg}/>
                            로그아웃</motion.button>
                    </div>
                </motion.div>
                <motion.div className={noticeBoardModal ? style.noticeBoardModal : style.none}>
                        <NoticeBoard/>
                </motion.div>
                <motion.div className={chartModal ? style.chartModal : style.none}>
                        <Chart/>
                </motion.div>
                <motion.div className={userInfoModal ? userInfoModal : style.none}>
                        <UserInfo/>
                </motion.div>
            </div>
            <div className={style.mainContents}>
                <UserCam authenticated={props.authenticated} className={style.mainContents}/>
                
                <label for="chatBotBtn" className={style.chatBotBtn2}>
                    <img src="/img/chatBot.png" alt="챗봇"/>
                </label>
                <button type="button" className={style.chatBotBtn} name="chatBotBtn">챗봇</button>
            </div>
        </>
    )
    }
}


export default WebcamPage;