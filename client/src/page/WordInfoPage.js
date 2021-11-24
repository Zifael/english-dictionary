import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOneWords } from '../http/wordApi';
import { setWordOne } from '../redux-store/word-reducer';
import { oneWordSelector } from '../selectors/selectors';
import {MAIN_ROUTER} from '../utils/constantRouter'
import s from './WordInfoPage.module.css'

function WordInfoPage(props) {

    
    const oneWord = useSelector(oneWordSelector)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()  
    
    useEffect(()=>{
        fetchOneWords(id).then(response => dispatch(setWordOne(response)))
    },[])   
    
    return (
        <div className={s.oneWord}>
            {oneWord && 
                <div>
                    { oneWord.info.length !== 0 ?        
                    <div className={s.oneWordContent}>
                        <div className={s.oneWordTitle}>
                            <h2 className={s.info}>{oneWord.wordEnglish}</h2>
                            <button onClick={()=>navigate(MAIN_ROUTER)} className={s.close}>&#10006;</button>                                
                        </div>      
                        <div className={s.oneWordInfo}>
                            {oneWord.info.map(oneword=> 
                                    <div key={oneword.id}>
                                        <div className={s.description}>{oneword.description}</div>
                                    </div>
                            )}
                        </div>
                    </div>
                    :
                    <div className={s.noDescription}>                    
                            <h2 className={s.noDescriptionTitle}>Нет описания</h2>          
                            <button  onClick={()=>navigate(MAIN_ROUTER)} className={s.reutnMainPage}>Вернуться назад</button>                             
                    </div>
                        } 
                </div>                
            }           
        </div>
    );
}

export default WordInfoPage;