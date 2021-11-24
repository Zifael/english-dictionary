import React from 'react';
import {Routes, Route} from 'react-router-dom'
import AuthPage from '../page/AuthPage';
import MainPage from '../page/MainPage';
import WordInfoPage from '../page/WordInfoPage';
import CreateWordPage from '../page/CreateWordPage';
import { CREATE_WORD, LOGIN_ROUTER, MAIN_ROUTER, REGISTRATION_ROUTER, WORD_ROUTER } from '../utils/constantRouter';




function AppRouter(props) {
    return (
        <Routes>   
            <Route path={MAIN_ROUTER} element={<MainPage />}/>
            <Route path={LOGIN_ROUTER} element={<AuthPage />}/>
            <Route path={REGISTRATION_ROUTER} element={<AuthPage />}/>
            <Route path={WORD_ROUTER + '/:id'} element={<WordInfoPage />}/>
            <Route path={CREATE_WORD} element={<CreateWordPage />} />
        </Routes>
    );
}

export default AppRouter;