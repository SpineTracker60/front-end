import { useRef , useState, useEffect} from "react";
import style from "./ChatBotModal.module.css";
import axios from "axios";
import { API_BASE_URL_SOCKET } from "../../../constants";
import { motion } from "framer-motion";





function ChatBotModal(props){
    const chat = useRef(null);

    console.log('props.chatList : ',props.chatList);

    const [submitChatState, setSubmitChatState] = useState(false);

    const submitChat = () => {
        axios.post(API_BASE_URL_SOCKET + '/chat?memberId='+ props.user.id,
        {
            "chat" : chat.current.value,
            "chatTag" : "chat"
        });
        chat.current.value = '';
        
    }
    useEffect(() => {
        // setChatState(botChat);
        // console.log(chatState);
    },[props.chatList])

    return(
        <div className={style.frame}>
            <div className={style.topFrame}>
                <img src="/img/chatbot.png" className={style.chatBotImg}/>
                <p className={style.chatBotName}>레톤이</p>
                <p className={style.chatBotIntro}>AI 챗봇 레톤이에게 무엇이든 물어보세요!</p>
            </div>
            <div className={style.contentsFrame}>
                <div className={style.chatBotChatDiv}>
                    <div className={style.chatExample}>
                    <img src="/img/chatchat.png" className={style.chatBotChatIcon}/>
                    <div className={style.chatBotChatting}>
                        <p>
                            안녕하세요! 저는 척추의 요정 AI 챗봇 레톤
                            이에요. 궁금하신 게 있다면 저에게 질문해 
                            주세요. 무엇을 도와드릴까요?<br/>
                            척추의 요정 소개 🧚<br/>
                            서비스 이용 안내 🙏<br/>
                            맞춤 상품 추천 🩻<br/>
                            바른 자세 안내 📌<br/>
                            스트레칭 방법 안내 💪<br/>
                            자유로운 채팅
                        </p>
                    </div>
                    </div>
                    <ul>
                    {props.chatList.map((chat) => (
                        <li>
                            <div className={style.chattingArea}>
                                <div className={chat.body ? style.userChatDiv : style.none}>
                                    {chat.body}
                                </div>
                                <div className={chat.answer ? style.chatBotChatFrame : style.none}>
                                    <img src="/img/chatchat.png" className={chat.answer ? style.chatBotChatIcon : style.none}/>
                                    <div className={chat.answer ? style.chatBotChattingDiv : style.none}>
                                        {chat.answer}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                    )}
                    </ul>
                </div>
                
            </div>
            <div className={style.bottomFrame}>
            <input type="text" ref={chat} placeholder="척추의 요정 레톤이에게 무엇이든 물어보세요!" className={style.chat}></input>
            <motion.button type="button" onClick={submitChat} className={style.chatBtn}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}>
                <img src="/img/send.png"/>
            </motion.button>
            </div>
        </div>
    )


}

export default ChatBotModal;