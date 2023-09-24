import { motion } from "framer-motion";
import style from "./NoticeBoard.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../constants";



function NoticeBoard({writingModalWrapper, setWritingModalWrapper}) {
    const [posts, setPosts] = useState([]);
    const [writingModal, setWritingModal] = useState(false);
    

    
    useEffect(() => {
    axios.get(API_BASE_URL + "/board/list",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
    })
    .then(response =>{
        console.log(response.data);
        setPosts(response.data);
    })
    },
    [])
    const writingModalHandler = () =>{
        setWritingModalWrapper(!writingModalWrapper)
        setWritingModal(!writingModal);
    }

    let i = 0;  
    useEffect(() => {
        for(i; i < posts.length; i++){          
            if(posts[i].postTitle.length > 19){
                let maxTitle = posts[i].postTitle.slice(0, 19) + ' ...';
                posts[i].postTitle = maxTitle;
            }
            if(posts[i].postBody.length > 85){
                let maxBody = posts[i].postBody.slice(0, 85) + ' ...';
                posts[i].postBody = maxBody;
            }
            posts[i].postBody = 
            posts[i].postBody.slice(0, 31) + '\n' + posts[i].postBody.slice(31, 62) + '\n' + posts[i].postBody.slice(62, 85);
        }
        setPosts(posts);
    },[])


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
                    {posts.map((post) => (
                    <li key={post.board_id}>
                        <div className={style.postCard}>
                            <div >
                                <div className={style.postUserInfo}>
                                    <img src={post.profile_image} className={style.userImg}/>
                                    <p className={style.userName}>{post.writer_name}님의 추천</p>
                                </div>
                                <div>
                                    <p className={style.postTitle}>{post.product_name}</p>
                                    <pre className={style.postBody}>{post.content}</pre>
                                    <a href={post.product_url} target='_blank' className={style.productLink}>{post.product_url}</a>
                                </div>                            
                            </div>
                            <div>
                                <img src={post.image_url} className={style.productImg}/>
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