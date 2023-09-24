import { useRef } from "react";
import style from "./ChatBotModal.module.css";
import axios from "axios";
import { API_BASE_URL_SOCKET } from "../../../constants";
import { motion } from "framer-motion";

function ChatBotModal(props){
    const chat = useRef(null);

    const submitChat = () => {
        axios.post(API_BASE_URL_SOCKET + '/chat?memberId='+ props.user.id,
        {
            "chat" : chat.current.value,
            "chatTag" : "chat"
        });
        chat.current.value = '';
    }

    return(
        <div className={style.frame}>
            <div className={style.topFrame}>
                <img src="/img/chatbot.png" className={style.chatBotImg}/>
                <p className={style.chatBotName}>레톤이</p>
                <p className={style.chatBotIntro}>AI 챗봇 레톤이에게 무엇이든 물어보세요!</p>
            </div>
            <div className={style.contentsFrame}>

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