import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletWord, fetchOneWords} from '../http/wordApi';
import {useDispatch, useSelector} from 'react-redux'
import { CREATE_WORD, LOGIN_ROUTER, WORD_ROUTER } from '../utils/constantRouter';
import s from './MainPage.module.css'
import { isAuth, wordsSelector } from '../selectors/selectors';
import { setAuth } from '../redux-store/auth-reducer';
import { fetchWordsAction, setWordDeletion } from '../redux-store/word-reducer';

function MainPage(props) {

    const auth = useSelector(isAuth)
    const words = useSelector(wordsSelector)
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    
    const openInfoWord = (id) => {
        navigate(`${WORD_ROUTER}/${id}`)
        fetchOneWords(id).then()
    }

    useEffect(()=> {
        dispatch(fetchWordsAction())
    },[])
    
    const unLogin = () => {
        dispatch(setAuth(false))
        navigate(LOGIN_ROUTER)
    }

    const deletWordClick = (id) => {        
        deletWord(id).then(dispatch(setWordDeletion(id)))                        
    }
    
    return (
        <div className={s.wordContent}>            
            <div className={s.buttonsBlock}>                
                {auth ? <button className={s.addWord} onClick={()=>navigate(CREATE_WORD)}>Добавить слово</button> : <div></div>}            
                {auth
                    ? 
                    <button onClick={unLogin} >Выйти</button> 
                    :
                    <button onClick={()=>navigate(LOGIN_ROUTER)}>Войти</button>
                }                
            </div>                  
            <div className={s.wordClick}>
                {words.map(word =>                
                    <div className={s.wordBlock} key={word.id}>
                        <div onClick={()=>openInfoWord(word.id)} className={s.wordMain} >
                            <div className={s.wordEnglish}>{word.wordEnglish}</div>
                            <div className={s.line}></div>
                            <div className={s.wordRussia}>{word.wordRussia}</div>                        
                        </div>
                        {auth ? <button className={s.deletWord} onClick={()=>deletWordClick(word.id)}>&times;</button> : null}
                    </div>                      
                )}
            </div>            
        </div>
    );
}

export default MainPage;