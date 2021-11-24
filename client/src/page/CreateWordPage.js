import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createWord } from '../http/wordApi';
import { setAddWord } from '../redux-store/word-reducer';
import { MAIN_ROUTER } from '../utils/constantRouter';
import s from './CreateWordPage.module.css'

function CreateWord() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [info,setInfo] = useState([])
    const [valueInfo, setValueInfo] = useState('') 
    const [addInfo, setAddInfo] = useState(false)
    
    const [wordEnglishValue,setWordEnglishValue] = useState('') 
    const [wordRussiaValue,setWordRussiaValue] = useState('')   
    

    const changeInfo = () => {
        setInfo([...info, {number:Date.now(), description:valueInfo}])
        setValueInfo('')
        setAddInfo(true)
        setTimeout(() => setAddInfo(false),3000)        
    }    
    const addWords = () => {                
        createWord({'wordEnglish':wordEnglishValue,'wordRussia':wordRussiaValue, 'info': JSON.stringify(info)})
        .then(res => { 
            dispatch(setAddWord(res)) 
            navigate(MAIN_ROUTER)
        })    
    }    

    return (        
        <div className={s.createWordInfo}>
            <div>
            <button className={s.close} onClick={() => navigate(MAIN_ROUTER)}>Закрыть</button>
            </div>  
            <h3 className={s.titleCreateWord}>Добавить слово :</h3>          
            <div className={s.createWordBlock}>
                <div className={s.createWords}>                
                    <div className={s.englishWord}>
                        <div className={s.titleWord}>EnglishWord:</div>
                        <input  className={s.inputWord} value={wordEnglishValue} onChange={e => setWordEnglishValue(e.target.value)}/>
                    </div>
                    <div>
                        <div className={s.titleWord}>RussiaWord:</div>
                        <input className={s.inputWord} value={wordRussiaValue} onChange={e => setWordRussiaValue(e.target.value)}/>
                    </div>    
                </div>  
                <div className={s.blockButtonAddWord}>
                    <button className={s.addWordButton} onClick={()=>addWords()}>Создать слово</button>
                </div>
            </div>
            <h1 className={s.addInfo}>Добавить информацию</h1>             
            <textarea value={valueInfo} onChange={e => setValueInfo(e.target.value)} type='text' className={s.textarea}/>                      
            <button className={s.addInfoButton} onClick={changeInfo}>Добавить инофрмацию</button>    
            {addInfo ? <div className={s.infoAdding}>Информация добавлена</div> : null}            
        </div>        
    );   
}

export default CreateWord;