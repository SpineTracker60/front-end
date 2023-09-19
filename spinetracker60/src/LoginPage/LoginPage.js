import React, { useEffect } from 'react';
import { KAKAO_AUTH_URL, GOOGLE_AUTH_URL, ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import { Navigate } from 'react-router-dom';
import style from './LoginPage.module.css';
import { motion } from 'framer-motion'; 

function LoginPage(props) {
    // useEffect(() => {
    //     if (props.location.state && props.location.state.error) {
    //         setTimeout(() => {
    //             alert.error(props.location.state.error, {
    //                 timeout: 5000
    //             });
    //             props.history.replace({
    //                 pathname: props.location.pathname,
    //                 state: {}
    //             });
    //         }, 100);
    //     }
    // }, [props.location.state, props.history]);

    // if (props.authenticated) {
    //     return <Navigate
    //         to={{
    //             pathname: "/",
    //             state: { from: props.location }
    //         }} />;
    // }

    return (
        
        <motion.div className={style.loginContainer} 
        initial={{ opacity: 0, scale: 0.5 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{duration: 0.8, delay: 0.5,ease: [0, 0.71, 0.2, 1.01]}}>
            <div className="login-content">
                <p className={style.cheokchu1}>척추의 요정</p>
                <p className={style.cheokchu2}>데스크 워커를 위한<br/>웹캠 기반 AI 자세 교정 서비스</p>
                <SocialLogin />
            </div>
        </motion.div>
    );
}

function SocialLogin() {
    return (
        <div className={style.signInBtn}>
            <a className={style.googleBtn} href={GOOGLE_AUTH_URL}>
                <img src='/img/googleSignIn.png'/></a>
            <a className={style.kakaoBtn} href={KAKAO_AUTH_URL}>
                <img src='/img/KakaoSignIn.png'/></a>
        </div>
    );
}



export default LoginPage;