import { useEffect, useRef, useState } from "react";
import UserCam from "./component/UserCam";
import style from "./WebcamPage.module.css"
import { motion } from "framer-motion";
import "../css/common.css";
import { useNavigate } from "react-router-dom";
// import ChatBot from "./component/utils/ChatBot";
import axios from "axios";
import { API_BASE_URL, API_BASE_URL_SOCKET2 } from "../constants";
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
    

    const linkRef = useRef(null);
    const postRef = useRef(null);
    const updatePostRef = useRef(null);

    const navigate = useNavigate();

    const [noticeBoardModal, setNoticeBoardModal] = useState(false);
    const [chartModal, setChartModal] = useState(false);
    const [userInfoModal, setUserInfoModal] = useState(false);
    const [writingModalWrapper, setWritingModalWrapper] = useState(false);
    const [updateModalWrapper, setUpdateModalWrapper] = useState(false);
    const [chatBotModal, setChatBotModal] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [parsedProductUrl, setParsedProductUrl] = useState("");
    const [parsedProductName, setParsedProductName] = useState("");
    const [parsedImageUrl, setParsedImageUrl] = useState("");
    const [parsedProductName2, setParsedProductName2] = useState("");
    const [parsedProductId, setParsedProductId] = useState(0);
    const [posts, setPosts] = useState([]);
    const [board, setBoard] = useState([]);
    const [updatePost, setUpdatePost] = useState({});
    const [updatePostId ,setUpdatePostId] = useState(0);
    const [startModal, setStartModal] = useState(false);

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
    
    useEffect(() => {
        axios.get(API_BASE_URL + "/board/list",{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response =>{
            setPosts(response.data.reverse());
        })
        
    },
    [])
    let i = 0;  
    useEffect(() => {
        if(posts.length > 0){
            console.log("posts = ",posts);  
            for(i; i < posts.length; i++){    
                console.log("post = ",posts[i]);      
                if(posts[i].product_name.length > 19){
                    let maxTitle = posts[i].product_name.slice(0, 19) + ' ...';
                    posts[i].product_name = maxTitle;
                }
                if(posts[i].content.length > 85){
                    let maxBody = posts[i].content.slice(0, 85) + ' ...';
                    posts[i].content = maxBody;
                }
                posts[i].content = 
                posts[i].content.slice(0, 31) + '\n' + posts[i].content.slice(31, 62) + '\n' + posts[i].content.slice(62, 85);
            }

            setBoard(posts);
        }
    },[posts])
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
    const updateModalHandler = () => {
        setUpdateModalWrapper(!updateModalWrapper);
    }
    
    const chatBotModalHandler = () => {
        setChatBotModal(!chatBotModal);
    }
    const startModalHandler = () => {
        setStartModal(!startModal)
    }


    
    const parseLinkHandler = () => {
        const url = new URL(linkRef.current.value);
        url.search='';
        const parsedURL = url.toString();
        axios.post(API_BASE_URL + "/product",{
            "product_url" : parsedURL,
        }
        ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res => {
            setParsedImageUrl("//" + res.data.image_url);
            if(res.data.product_name.length > 23){
                let maxTitle = res.data.product_name.slice(0, 23) + ' ...';
                setParsedProductName2(maxTitle);
            }
            setParsedProductName(res.data.product_name);
            setParsedProductUrl(res.data.product_url);
            setParsedProductId(res.data.product_id);
        }
        )
        }
    const submitOnClickHandler = () => {
        console.log(postRef.current.value);
        console.log(linkRef.current.value);

        axios.post(API_BASE_URL + "/board",{
            
            "content" : postRef.current.value,
            "product_name" : parsedProductName,
            "product_url" : parsedProductUrl,
            "image_url" : parsedImageUrl,
            "product_id" : parsedProductId,
        }
        ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => {
            console.log(response.data);
            setPosts([response.data, ...posts])
        })

        setWritingModalWrapper(!writingModalWrapper);
    }
    const updateOnClickHandler = () => {
        
    }
    

    // async function fetchData(url){
    //     try{
    //         console.log(url);
    //         var res1 = encodeURI(url);
    //     const response = await fetch(`https://opengraph.io/api/1.1/site/${res1}?app_id=18bc489b-2d31-4c86-9692-b11a65785bf9`);
    //     //https://opengraph.io/api/1.1/site/<URL encoded site URL>?app_id=xxxxxx
    //     const data = await response.json();
    //     console.log(data);
    //     }catch (error){
    //         console.error(error);

    //     }

         
        
    // }
    let socket;
    const ENDPOINT = API_BASE_URL_SOCKET2;
//     useEffect(() => {
        



    
    
    
//     socket = io(`${ENDPOINT}/room`, {
//         transports: ["websocket"]
//     });

//     socket.connect();

//     socket.on("join", (chat) => {
//         console.log("성공");
//     });

//     socket.on("chat", (chat) => {
//         if(chat) {
//             if(chat.body){
//                 console.log(chat.body);
//                 }
//                 if(chat.answer){
//                 console.log(chat);
//                 }
//                 setChatList([...chatList, chat]);
//                 //botChat.push(chat);
//         }
        
// }

//     );
//     roomJoin(props.user.id, socket);
//     },[ENDPOINT,socket])



    if(props.authenticated){
    
    const userImgUrl = props.user.profileImage;
    const userName = props.user.name;

        

    // ChatBot(props);
    // Alarm();

    // if(true){
    //     const userImgUrl = "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/blt58ef7034e07c73bc/62cdb7613745b748b33a95b2/GettyImages-1358485714.jpg?auto=webp&format=pjpg&width=1080&quality=60"
    //     const userName = "호날두"
    
    

    return(
        <>  
            <div className={!startModal ? style.startModal : style.none}>
                <p className={style.style1}>정자세 측정을 위해<br/>바른 자세로 앉아주세요.</p>
                <p className={style.style2}>정자세 측정은 최초 1회만 진행됩니다.</p>
                <p className={style.style3}>
                    1. 엉덩이를 최대한 뒤로 붙이고 앉습니다.<br/>
                    2. 어깨를 펴고 등을 곧게 세웁니다.<br/>
                    3. 무릎은 벌리지 않고 붙여서 90도로 바르게 둡니다.<br/>
                    4. 모니터를 볼 때는 턱을 아래로 당겨줍니다.
                </p>
                <img src="/img/sitdown.png" className={style.startModalImg}/>
                <button onClick={startModalHandler} className={style.startModalBtn}>네, 준비됐어요!</button>
            </div>
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
                        <img src="/img/logofit.png" className={style.logofit}/>
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
                        <NoticeBoard writingModalWrapper ={writingModalWrapper} setWritingModalWrapper = {setWritingModalWrapper}
                        user={props.user} board={board} setPosts={setPosts} updateModalWrapper={updateModalWrapper} setUpdateModalWrapper={setUpdateModalWrapper}
                        setUpdatePostId = {setUpdatePostId}
                        />
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
                        <div className={style.searchDiv}>
                            <input type="text" className={style.coupangLink} placeholder="제품 링크를 입력해주세요." ref={linkRef}/>
                            <button type="button" className={style.searchBtn} onClick={parseLinkHandler}>
                                <img src="/img/search.png" />
                            </button>
                        </div>
                        <div>
                            <textarea type="text" className={style.writePost} placeholder="내용을 입력해주세요." maxLength="160" ref={postRef}/>
                        </div> 
                        <div className={style.linkArea}>
                            <div className={style.idkArea}>
                                <p className={style.parsedProductName}>{parsedProductName2}</p>
                                <img src={parsedImageUrl} className={style.parsedImageUrl}/>                              
                            </div>
                            <a href={parsedProductUrl} target='_blank' className={style.parsedProductUrl}>제품 링크</a>
                        </div>
                        <div>
                            <button type="button" className={style.submitBtn} onClick={submitOnClickHandler}>
                                작성 완료
                            </button>
                    </div>
                </motion.nav>
            </div>
            
                <div className={updateModalWrapper ? style.writingModalWrapper : style.none}>
                    <motion.nav 
                        animate={updateModalWrapper ? "open" : "closed"}
                        variants={variants}
                        className={style.updateModal}
                    >   
                        <div className={style.modalUserInfoDiv}>
                            <img src={userImgUrl} className={style.modalUserImg} alt="사진"/>
                            <p className={style.modalUserName}>{userName}님의 추천</p>
                            <motion.button type="botton" className={style.modalXBtn} onClick={updateModalHandler}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            >
                                <img src="/img/X.png"/>
                            
                            </motion.button>
                        </div>
                            <div>
                                <textarea type="text" className={style.updateWritePost} placeholder="내용을 입력해주세요." maxLength="160" ref={updatePostRef}/>
                            </div> 
                            <div>
                                <button type="button" className={style.submitBtn} onClick={updateOnClickHandler}>
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