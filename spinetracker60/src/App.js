import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {getCurrentUser} from "./LoginPage/utils/APIUtils"
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { useEffect } from 'react';
import OAuth2RedirectHandler from './oauth2/OAuth2RedirectHandler';
import WebcamPage from "./WebcamPage/WebcamPage";
import LoginQuestion from "./LoginPage/LoginQuestion"
import LoginPage from "./LoginPage/LoginPage";
import PrivacyPolicy from "./terms/PrivacyPolicy";
import ServiceTerm from "./terms/ServiceTerm";

function App(){
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const loadCurrentlyLoggedInUser = () => {
        getCurrentUser()
        .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);     
        }).catch(error => {
        console.log(error);
        });
    }
    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setAuthenticated(false);
        setCurrentUser(null);
        alert("로그아웃 했습니다.");
    }
    useEffect(() => {
        if(localStorage.getItem(ACCESS_TOKEN)){
        loadCurrentlyLoggedInUser();
        }
    })

    return(
        <BrowserRouter>
            <AnimatePresence>
                <Routes>
                    <Route index element={<LoginPage/>}/>
                    <Route path='/userInfo' element={<LoginQuestion authenticated={authenticated} onLogout={handleLogout} user={currentUser}/>}/>
                    <Route path='/main' element={<WebcamPage authenticated={authenticated} onLogout={handleLogout} user={currentUser}/>}/>
                    <Route path='/privacyPolicy' element={<PrivacyPolicy/>}/>
                    <Route path='/serviceTerm' element={<ServiceTerm/>}/>
                    <Route path='/oauth2/redirect' element={<OAuth2RedirectHandler/>}/>
                </Routes>
            </AnimatePresence>
        </BrowserRouter>
    )
}

export default App;