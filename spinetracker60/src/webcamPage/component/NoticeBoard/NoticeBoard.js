import { motion } from "framer-motion";
import style from "./NoticeBoard.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";



function NoticeBoard({writingModalWrapper, setWritingModalWrapper, updateModalWrapper, setUpdateModalWrapper, user, board, setPosts, setUpdatePostId}) {
    
    
    
    
    const boardListRef = useRef(null);
    
     

    const navigate = useNavigate();
    const updateModalHandler = (e) => {
        setUpdateModalWrapper(!writingModalWrapper)
        setUpdatePostId(e.target.value);
    }
    
    const writingModalHandler = (e) =>{
        setWritingModalWrapper(!writingModalWrapper)
    }
    const deletePostHandler = (e) =>{
        axios.delete(API_BASE_URL + `/board/${e.target.value}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(response => {
            console.log(response.status);
            if(response.status === 204) {
                axios.get(API_BASE_URL + "/board/list",{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                })
                .then(response =>{
                    setPosts(response.data.reverse());
                })
            }
        }
        )
        
    }



    return(
        <div className={style.frameDiv}>
            <div className={style.editTitleDiv}>
                <p className={style.title}>제품 추천 게시판</p>
                <motion.button type="button" className={style.editBtn} onClick={writingModalHandler}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                    <img src="/img/edit.png" className={style.editImg}/>
                </motion.button>
            </div>
            <div className={style.noticeBoardDiv}>
                <ul>
                    {board.map((post) => (
                    <li key={post.board_id} >
                        <div className={style.postCard}>
                            <div>
                                <div className={style.postUserInfo}>
                                    <img src={post.profile_image} className={style.userImg}/>
                                    <p className={style.userName}>{post.writer_name}님의 추천</p>
                                </div>
                                <button type="button" className={post.writer_id == user.id ? style.UBtn : style.none} onClick={updateModalHandler} value={post.board_id}>수정</button>
                                <button type="button" ref={boardListRef} onClick={deletePostHandler} className={post.writer_id == user.id ? style.DBtn : style.none} value={post.board_id}>삭제</button>
                                <div>
                                    <p className={style.postTitle}>{post.product_name}</p>
                                    <pre className={style.postBody}>{post.content}</pre>
                                    <a href={post.product_url} target='_blank' className={style.productLink}>{post.product_url}</a>
                                </div>                            
                            </div>
                            <div>
                                <img src={"//" + post.image_url} className={style.productImg}/>
                            </div>
                            
                        </div>
                        <hr className={style.postHr}/>
                    </li>                    
                    ))}
                </ul>
            </div>
        </div>
        
    )
}

export default NoticeBoard;